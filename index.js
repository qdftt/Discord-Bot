const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    REST,
    Routes
} = require("discord.js");

const fs = require("fs");
const { token } = require("./botconfig.json");
const { prefix, clientId, guildId } = require("./config.json");

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
});

bot.commands = new Collection();
bot.aliases = new Collection();

// Load slash + prefix commands
async function registerSlashCommands() {
    const commands = [];
    const folders = fs.readdirSync("./commands");

    for (const folder of folders) {
        const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

        for (const file of files) {
            const command = require(`./commands/${folder}/${file}`);

            if (command.data) {
                commands.push(command.data.toJSON());
                bot.commands.set(command.data.name, command);
            } else if (command.config) {
                bot.commands.set(command.config.name, command);

                if (command.config.aliases) {
                    for (const a of command.config.aliases) {
                        bot.aliases.set(a, command.config.name);
                    }
                }
            }
        }
    }

    const rest = new REST({ version: "10" }).setToken(token);

    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        console.log("Slash commands registered");
    } catch (err) {
        console.error(err);
    }
}

// Load handlers
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.once("ready", async () => {
    console.log(`${bot.user.tag} is online`);
    await registerSlashCommands();
});

// Prefix commands
bot.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command =
        bot.commands.get(cmd) ||
        bot.commands.get(bot.aliases.get(cmd));

    if (!command) return;

    try {
        if (command.run) {
            await command.run(bot, message, args);
        }
    } catch (err) {
        console.error(err);
    }
});

// Slash commands
bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    try {
        if (command.execute) {
            await command.execute(interaction);
        }
    } catch (err) {
        console.error(err);
        const reply = { content: "Error executing command", ephemeral: true };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(reply);
        } else {
            await interaction.reply(reply);
        }
    }
});

bot.login(token);