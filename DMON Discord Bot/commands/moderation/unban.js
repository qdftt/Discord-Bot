const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  // Prefix command setup
  config: {
    name: "unban",
    aliases: ["unban"],
  },

  // Slash command setup
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by their ID.")
    .addStringOption(option =>
      option.setName("userid")
        .setDescription("The ID of the user to unban")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  // Shared unban logic (prefix + slash)
  async unbanUser(guild, userID) {
    try {
      // Fetch ban list
      const bans = await guild.bans.fetch();

      // Check if user is actually banned
      const bannedUser = bans.get(userID);
      if (!bannedUser) return false;

      // Unban user
      await guild.members.unban(userID);
      return true;
    } catch (err) {
      console.error("Unban error:", err);
      return false;
    }
  },

  // Prefix command
  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send("❌ You don't have permission.");

    const userID = args[0];
    if (!userID || isNaN(userID))
      return message.channel.send("❌ Please provide a valid user ID.");

    const success = await module.exports.unbanUser(message.guild, userID);

    if (!success)
      return message.channel.send("❌ That user is not banned or couldn't be unbanned.");

    message.channel.send(`🔓 **${userID}** has been unbanned by **${message.author.tag}**.`);
  },

  // Slash command
  execute: async (interaction) => {
    const userID = interaction.options.getString("userid");

    if (isNaN(userID)) {
      return interaction.reply({
        content: "❌ You must enter a valid numeric user ID.",
        flags: 64,
      });
    }

    const success = await module.exports.unbanUser(interaction.guild, userID);

    if (!success) {
      return interaction.reply({
        content: "❌ That user is not banned or couldn't be unbanned.",
        flags: 64,
      });
    }

    interaction.reply({
      content: `🔓 User **${userID}** has been unbanned.`,
      flags: 64,
    });
  },
};