const { readdirSync } = require("fs");

module.exports = (bot) => {

    // Load all event files inside a folder (e.g., "client", "guild")
    const load = (folder) => {

        // Get all .js event files from the folder
        const files = readdirSync(`./events/${folder}/`).filter(f => f.endsWith(".js"));

        for (let file of files) {

            // Load the event file
            const event = require(`../events/${folder}/${file}`);

            // Event name is the file name (e.g., ready.js → "ready")
            const name = file.split(".")[0];

            // Register the event
            bot.on(name, event.bind(null, bot));

            console.log(`Loaded event: ${name}`);
        }
    };

    // Folders where your events are stored
    ["client", "guild"].forEach(folder => load(folder));
};