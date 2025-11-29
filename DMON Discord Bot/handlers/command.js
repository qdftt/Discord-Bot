const { readdirSync } = require("fs");

module.exports = (bot) => {

    // Load all commands inside a folder (e.g., "user", "moderation")
    const load = (folder) => {

        // Get all .js files in the command folder
        const files = readdirSync(`./commands/${folder}/`).filter(f => f.endsWith(".js"));

        for (let file of files) {

            // Load the command file
            const command = require(`../commands/${folder}/${file}`);

            // The command name:
            // - Prefix commands use: command.config.name
            // - Slash commands use: command.data.name
            const name = command.config?.name || command.data?.name;

            // Skip files that don't have a valid name
            if (!name) {
                console.warn(`Skipped '${file}' — no command name found.`);
                continue;
            }

            // Store the command
            bot.commands.set(name, command);

            // Add aliases if the command has them
            if (command.config?.aliases) {
                command.config.aliases.forEach(alias => bot.aliases.set(alias, name));
            }

            console.log(`Loaded command: ${name}`);
        }
    };

    // Folders where your commands are stored
    ["user", "moderation"].forEach(folder => load(folder));
};