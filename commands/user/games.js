const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "games",
    aliases: ["games", "Games"],
  },
  run: async (bot, message, args) => {
    // Delete the user's command message safely
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setTitle("DMON Supported Games")
      .setDescription(
        "> **[Universal](https://roblox.com)** <a:working:1423048234934341776>\n" +
        "> To add another game add a + as you can see above\n"
      )
      .setColor("#de5139");

    await message.channel.send({ embeds: [embed] });
  },
};

//[game name](link here)

// \n to post down more
