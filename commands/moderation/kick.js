const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  // Prefix command info
  config: {
    name: "kick",
    aliases: ["kick"],
  },

  // Slash command setup
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server.")
    .addUserOption(option =>
      option.setName("user").setDescription("User to kick").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason for the kick").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  // Shared kick logic
  async kickUser(guild, member, moderator, reason) {
    try {
      await member.send(`You were kicked from **${guild.name}**.\nReason: ${reason}`).catch(() => {});
      await member.kick(`By ${moderator.tag} | ${reason}`);
      return true;
    } catch (err) {
      console.error("Kick error:", err);
      return false;
    }
  },

  // Prefix version
  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.channel.send("❌ You don't have permission.");

    const member = message.mentions.members.first();
    if (!member) return message.channel.send("❌ Mention someone to kick.");

    if (member.id === message.author.id)
      return message.channel.send("❌ You can't kick yourself.");

    if (member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.channel.send("❌ You can't kick staff.");

    const reason = args.slice(1).join(" ") || "No reason provided";

    const success = await module.exports.kickUser(
      message.guild,
      member,
      message.author,
      reason
    );

    if (!success) return message.channel.send("❌ I couldn't kick them.");

    message.channel.send(`👢 **${member.user.tag}** was kicked.\nReason: ${reason}`);
  },

  // Slash version
  execute: async (interaction) => {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const reason = interaction.options.getString("reason") || "No reason provided";

    if (!member)
      return interaction.reply({ content: "❌ Couldn't find that user.", flags: 64 });

    if (member.permissions.has(PermissionFlagsBits.KickMembers))
      return interaction.reply({ content: "❌ You can't kick staff.", flags: 64 });

    const success = await module.exports.kickUser(
      interaction.guild,
      member,
      interaction.user,
      reason
    );

    if (!success)
      return interaction.reply({ content: "❌ I couldn't kick them.", flags: 64 });

    interaction.reply({
      content: `👢 **${member.user.tag}** was kicked.\nReason: ${reason}`,
      flags: 64,
    });
  },
};