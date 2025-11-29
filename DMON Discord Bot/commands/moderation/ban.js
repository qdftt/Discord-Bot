const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  // Prefix command info
  config: {
    name: "ban",
    aliases: ["ban"],
  },

  // Slash command setup
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server.")
    .addUserOption(option =>
      option.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason for the ban").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  // Shared ban function (used by both prefix & slash)
  async banUser(guild, target, moderator, reason) {
    try {
      await target.send(`You were banned from **${guild.name}**.\nReason: ${reason}`).catch(() => {});
      await guild.members.ban(target, { reason: `By ${moderator.tag} | ${reason}` });
      return true;
    } catch {
      return false;
    }
  },

  // Prefix version
  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send("❌ You don't have permission.");

    const target = message.mentions.members.first();
    if (!target) return message.channel.send("❌ Mention someone to ban.");

    if (target.id === message.author.id)
      return message.channel.send("❌ You can't ban yourself.");

    if (target.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send("❌ You can't ban staff.");

    const reason = args.slice(1).join(" ") || "No reason provided";

    const success = await module.exports.banUser(
      message.guild,
      target,
      message.author,
      reason
    );

    if (!success) return message.channel.send("❌ I couldn't ban them.");

    message.channel.send(`✅ **${target.user.tag}** was banned.\nReason: ${reason}`);
  },

  // Slash version
  execute: async (interaction) => {
    const target = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(target.id);
    const reason = interaction.options.getString("reason") || "No reason provided";

    if (!member)
      return interaction.reply({ content: "❌ I can't find that user.", flags: 64 });

    if (member.permissions.has(PermissionFlagsBits.BanMembers))
      return interaction.reply({ content: "❌ You can't ban staff.", flags: 64 });

    const success = await module.exports.banUser(
      interaction.guild,
      member,
      interaction.user,
      reason
    );

    if (!success)
      return interaction.reply({ content: "❌ I couldn't ban them.", flags: 64 });

    interaction.reply({
      content: `✅ **${member.user.tag}** was banned.\nReason: ${reason}`,
      flags: 64,
    });
  },
};