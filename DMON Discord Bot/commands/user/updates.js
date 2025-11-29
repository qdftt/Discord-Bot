const { EmbedBuilder } = require("discord.js");

module.exports = {
  // Command name + aliases
  config: {
    name: "updates",
    aliases: ["update", "Update"],
  },

  // Command execution
  run: async (bot, message, args) => {

    // Delete the command message
    await message.delete().catch(() => {});

    // Role that gets pinged when updates are posted
    const roleID = "";

    const embed = new EmbedBuilder()
      .setTitle("Updates")
      .setDescription("> Version **v1.0**\n```Test\n```")
      .setColor("#de5139")
      .setTimestamp();

    try {
      // Send the role mention + embed
      await message.channel.send({
        content: `<@&${roleID}>`, // Pings the update role
        embeds: [embed],
        allowedMentions: { parse: ["roles"] }, // Only role pings allowed
      });
    } catch (err) {
      console.error("❌ Failed to send update message:", err);
    }
  },
};

// -----------------------------------------
// Notes for updating:
// \n → New line
// Version must increase each update: v1.0 → v1.1
// KEEP "Diff" (controls + / - colors)
// Add your update lines after "Diff\n"
// + = Green (additions)
// - = Red (removals)
// * or nothing = Neutral change
// -----------------------------------------