require("dotenv").config()

module.exports = async (client, message) => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	var args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};