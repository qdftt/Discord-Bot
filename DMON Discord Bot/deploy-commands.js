const { REST, Routes } = require("discord.js");
const { clientId, guildId } = require("./config.json");
const { token } = require("./botconfig.json");
const fs = require("fs");

const commands = [];

// Load slash commands
const folders = fs.readdirSync("./commands");
for (const folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${folder}/${file}`);
        if (command.data) {
            commands.push(command.data.toJSON());
            console.log(`Loaded: ${command.data.name}`);
        }
    }
}

const rest = new REST({ version: "10" }).setToken(token);

// Deploy slash commands
(async () => {
    try {
        console.log("Updating slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log("Slash commands updated.");
    } catch (err) {
        console.error(err);
    }
})();