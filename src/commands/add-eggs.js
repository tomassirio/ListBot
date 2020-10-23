const Util = require('../utils/utils.js')

const AddEggs = {
    check: (item, message) => {
        let konamiEggMessages = [
            '🥚',
            'Searching...\nError: Contra not found.',
            'Searching...\nError: Gradius not found.',
            '⚠ Cheat mode enabled ⚠',
            'You destroyed the Vile Red Falcon and saved the universe.\nConsider yourself a hero. 🏅',
            'Nerd. 🤓',
            'Cheater!',
            'Game recognizes game. 😉',
            'You just fired Hideo Kojima. 😳',
            'Kojima approves!',
        ]

        switch (item) {
            // Check for trigger of Konami Code Egg
            case '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA': {
                // Send a random egg message.
                let embeddedMessage = Util.embedMessage(
                    konamiEggMessages[
                        Math.floor(Math.random() * konamiEggMessages.length)
                    ],
                    message.author,
                    '0xffff00',
                    'You found the Konami Code Easter Egg.\nNothing was added.'
                )

                message.channel.send(embeddedMessage)

                // true signals to terminate primary command after easter egg runs.
                return true
            }

            default:
                // false signals to continue with primary command.
                return false
        }
    },
}

module.exports = AddEggs
