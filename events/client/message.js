const { prefix } = require("../../config.json");

module.exports = async (bot, message) => {

    // Ignore bot messages
    if (message.author.bot) return;

    // Ignore DMs (only respond in servers)
    if (!message.guild) return;

    // Make sure the message starts with the prefix (example: !help)
    if (!message.content.startsWith(prefix)) return;

    // Split message into args: "!ping test" → ["test"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // Command name (example: "ping")
    const cmd = args.shift().toLowerCase();

    // Find the command by its name or alias
    const command =
        bot.commands.get(cmd) ||
        bot.commands.get(bot.aliases.get(cmd));

    // Run the command if it exists
    if (command && command.run) {
        command.run(bot, message, args);
    }
};