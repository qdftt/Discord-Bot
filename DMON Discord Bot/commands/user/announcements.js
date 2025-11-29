const { EmbedBuilder } = require("discord.js");

module.exports = {
  // Command name + aliases (prefix version only)
  config: {
    name: "post",
    aliases: ["post", "Post"],
  },

  // Command execution
  run: async (bot, message, args) => {

    // Delete the command message (optional)
    await message.delete().catch(() => {});

    // Create the embed message
    const embed = new EmbedBuilder()
      .setTitle("DMON Announcements")
      .setDescription("Enter Text")
      .setColor("#de5139");

    // Send the embed
    await message.channel.send({ embeds: [embed] });
  },
};