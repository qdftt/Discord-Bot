const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  // Prefix command config
  config: {
    name: "clear",
    aliases: ["purge", "clear"],
  },

  // Slash command setup
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a number of messages in this channel.")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete (1–99)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  // Shared delete logic
  async deleteMessages(channel, amount) {
    try {
      if (amount > 99) amount = 99;
      if (amount < 1) return false;

      await channel.bulkDelete(amount, true);
      return true;
    } catch (err) {
      console.error("Clear error:", err);
      return false;
    }
  },

  // Prefix command
  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.channel.send("❌ You don't have permission.");

    const amount = parseInt(args[0]);
    if (!amount || isNaN(amount))
      return message.channel.send("❌ Please enter a valid number.");

    const success = await module.exports.deleteMessages(message.channel, amount);

    if (!success)
      return message.channel.send("❌ Unable to delete messages.");

    message.channel.send(`🧹 Deleted **${amount}** messages.`).then(m => {
      setTimeout(() => m.delete().catch(() => {}), 3000);
    });
  },

  // Slash command
  execute: async (interaction) => {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 99) {
      return interaction.reply({
        content: "❌ Amount must be between **1** and **99**.",
        flags: 64,
      });
    }

    const success = await module.exports.deleteMessages(
      interaction.channel,
      amount
    );

    if (!success) {
      return interaction.reply({
        content: "❌ I couldn't delete messages (check permissions).",
        flags: 64,
      });
    }

    interaction.reply({
      content: `🧹 Deleted **${amount}** messages.`,
      flags: 64,
    });
  },
};