const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot send a message in a selected channel.")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel to send the message to")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("The message you want the bot to say")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    // Get channel + message
    const targetChannel = interaction.options.getChannel("channel");
    const text = interaction.options.getString("message");

    // Validate channel type (must be text-based)
    if (!targetChannel.isTextBased()) {
      return interaction.reply({
        content: "❌ That channel can't be used for sending messages.",
        flags: 64, // ephemeral
      });
    }

    try {
      // Send message into the selected channel
      await targetChannel.send(text);

      // Confirmation message (ephemeral)
      await interaction.reply({
        content: `✅ Message sent to ${targetChannel}!`,
        flags: 64,
      });

    } catch (err) {
      console.error("Failed to send message:", err);

      await interaction.reply({
        content: "❌ Something went wrong while trying to send that message.",
        flags: 64,
      });
    }
  },
};