const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

const keyChannelID = "";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("key")
    .setDescription("Post a new DMON key to the key channel (auto-deletes the old one).")
    .addStringOption(option =>
      option
        .setName("keytext")
        .setDescription("Enter the new DMON key (example: DMON.ABC123)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {

    // Prevent interaction from timing out — 64 = EPHEMERAL
    await interaction.deferReply({ flags: 64 });

    const keyText = interaction.options.getString("keytext");
    const oneWeekFromNow = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);

    const embed = new EmbedBuilder()
      .setTitle("DMON Key")
      .setDescription(
        `\`\`\`${keyText}\`\`\`\nKey will change on <t:${oneWeekFromNow}:D>`
      )
      .setColor("#de5139");

    const keyChannel = interaction.client.channels.cache.get(keyChannelID);
    if (!keyChannel) {
      return interaction.editReply("❌ Could not find the key channel.");
    }

    try {
      // Delete last posted key if present
      const messages = await keyChannel.messages.fetch({ limit: 1 });
      const lastMessage = messages.first();
      if (lastMessage) {
        await lastMessage.delete().catch(() => {});
      }

      // Send the new key embed
      await keyChannel.send({ embeds: [embed] });

      // Edit the ephemeral reply
      await interaction.editReply(`✅ New key posted in <#${keyChannelID}>.`);

    } catch (err) {
      console.error("Error posting key:", err);
      await interaction.editReply("❌ Something went wrong while posting the key.");
    }
  },
};