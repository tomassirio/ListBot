const Util = require('../utils/utils.js')
const ChannelRepository = require('../repositories/channel-repository')

const MAX_POLL_TIME_MINUTES = 1440 // 24 hours in minutes (60*24)
const MIN_ITEMS_COUNT = 2
const MAX_ITEMS_COUNT = 9
const DEFAULT_ITEMS_COUNT = 5
// Changing MIN_ITEMS_COUNT and MAX_ITEMS_COUNT outside the range [1, 9] breaks the emotes
// Having 1 as MIN_ITEMS_COUNT breaks the purpose of a poll

module.exports = {
    name: 'poll',
    description: `Generates a Poll from ${MIN_ITEMS_COUNT} to ${MAX_ITEMS_COUNT} random elements on the list`,
    execute: async (
        message,
        [time, requestedPollCount = DEFAULT_ITEMS_COUNT]
    ) => {
        let { channel } = message
        const { items } = await ChannelRepository.findOrCreate(channel)

        let pollItemsCount = Math.min(
            Math.max(requestedPollCount, MIN_ITEMS_COUNT),
            items.length,
            MAX_ITEMS_COUNT
        )
        // List can only have items up to i = 9(1-9) as emotes will break when ranges goes beyond that.
        let emojiList = [...Array(pollItemsCount).keys()].map(
            (i) => `${i + 1}️⃣`
        )

        // Shuffle list elements
        let shuffled = Array.from(items).sort(() => 0.5 - Math.random())

        // Get first 5 from shuffle elements
        let selected = shuffled.slice(0, pollItemsCount)

        // Format the poll options.
        let optionsText = selected.map(
            (_, i) => `${emojiList[i]} ${selected[i].content}`
        )

        // Create embed for the poll.
        let embed = Util.embedMessage(
            `Poll for \`${channel.name}\``,
            message.author,
            '0xff0000',
            optionsText
        )

        // Determine the poll duration.
        let pollDuration = 0
        let minutes = Number(time)
        let durationDescription = ''

        if (!isNaN(minutes) && minutes > 0) {
            // Don't let the poll run for more than 24 hours.
            if (minutes > MAX_POLL_TIME_MINUTES) {
                minutes = MAX_POLL_TIME_MINUTES
            }

            pollDuration = Math.round(minutes * 60) * 1000 // rounding if minutes >0 and <1

            // Create a nice, human-readable duration description (e.g. 2 hours and 30 minutes).
            if (minutes > 59) {
                let hours = Math.floor(minutes / 60)
                let remainingMinutes = minutes % 60
                let hourPluralizer = hours > 1 ? 's' : ''
                let minutesPluralizer = remainingMinutes > 1 ? 's' : ''
                durationDescription = `${hours} hour${hourPluralizer}`
                durationDescription +=
                    remainingMinutes > 0
                        ? ` and ${remainingMinutes} minute${minutesPluralizer}`
                        : ''
            } else if (minutes < 1) {
                let seconds = Math.round(minutes * 60)
                let secPluralizer = seconds > 1 ? 's' : ''
                durationDescription = `${seconds} second${secPluralizer}`
            } else {
                let minPluralizer = minutes > 1 ? 's' : ''
                durationDescription = `${minutes} minute${minPluralizer}`
            }

            embed.setFooter(
                `The poll has started and will last ${durationDescription}`
            )
        } else {
            embed.setFooter(`The poll has started and has no end time`)
        }

        // Send the initial poll message to the channel then do some processing after its been sent successfully.
        channel.send(embed).then(async (pollMessage) => {
            // If no time limit was set for the poll, just exit without doing anything to collect results.
            if (pollDuration === 0) {
                // Just provide the initial emoji reacts and exit.
                emojiList.forEach((e) => pollMessage.react(e))
                return
            }

            // Create object to tally votes. (Object keys are the vote emoji, and values are the count for that emoji)
            const voteCounts = emojiList.reduce((acc, cur) => {
                // For each emoji in the list set the initial count to -1
                // (this accounts for the bot setting the initial reactions for voting)
                acc[cur] = -1
                return acc
            }, {})

            // Setup a filter to only collect the emoji used to vote (i.e. 1-5).
            const filter = (reaction) => {
                return emojiList.includes(reaction.emoji.name)
            }

            // Create a Reaction Collector to collect reactions (i.e. votes) for the poll duration.
            const collector = pollMessage.createReactionCollector(filter, {
                time: pollDuration,
                dispose: true,
            })

            // Register a handler for when a user votes.
            collector.on('collect', (r) => {
                // Count the vote for this emoji.
                voteCounts[r.emoji.name] += 1
            })

            // Register a handler for when a user removes a vote.
            collector.on('remove', (r) => {
                // Remove the vote for this emoji.
                voteCounts[r.emoji.name] -= 1
            })

            // Register a handler for when the requested time period is up where the winner will be determined.
            collector.on('end', () => {
                let totalVotes = 0
                let highVote = 0

                // Hold the emoji with the highest vote count (could be multiple due to ties).
                let highestVotedEmoji = []

                // Go through the vote counts and determine highest vote count and corresponding emoji.
                for (const [key, value] of Object.entries(voteCounts)) {
                    if (value !== 0) {
                        totalVotes += value

                        if (value > highVote) {
                            highVote = value
                            highestVotedEmoji = [key]
                        } else if (value === highVote) {
                            highestVotedEmoji.push(key)
                        }
                    }
                }

                // Create a human-friendly vote count description.
                let voteDescription = `${totalVotes} vote${
                    totalVotes > 1 ? 's' : ''
                }`

                // Create the poll results message.
                let resultMessage

                if (totalVotes === 0) {
                    resultMessage = 'No one voted! 😢'
                } else if (highestVotedEmoji.length === 1) {
                    resultMessage = `With ${voteDescription}, the winner is:\n${highestVotedEmoji[0]}`
                } else if (highestVotedEmoji.length === 2) {
                    resultMessage =
                        `There is a tie!\n` +
                        `The winners, with ${voteDescription}, are:` +
                        `\n${highestVotedEmoji.join(', ')}`
                } else if (highestVotedEmoji.length === emojiList.length) {
                    resultMessage =
                        `Well, this is anti-climactic. It's an all-way tie.\n` +
                        `With ${voteDescription}, everyone wins... 🤷‍♂️❓🤷‍♀️`
                } else {
                    resultMessage =
                        `There is a ${highestVotedEmoji.length}-way tie! ` +
                        `And the winners are:\n\t${highestVotedEmoji.join(
                            ', '
                        )}`
                }

                // Add the results to the message embed and update the timestamp.
                embed.addField('**Results**', resultMessage)
                embed.setFooter(
                    `The poll is now closed! It lasted ${durationDescription}`
                )
                pollMessage.edit('', embed)
                embed.setTimestamp()
            })

            // After the poll message is first sent, have the bot set the initial reactions to be used for voting.
            emojiList.forEach((e) => pollMessage.react(e))
        })
    },
}
