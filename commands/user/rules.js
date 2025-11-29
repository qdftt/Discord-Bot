const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "rules",
    aliases: ["rules", "Rules"],
  },

  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setTitle("DMON Rules")
      .setColor("#de5139")
      .setDescription(
        "**> This server is NOT related to cheating in games. It provides an extension to a popular scripting utility which abides by the law.**\n\n" +

        "__**1.0 — Discord Requirements**__\n" +
        "**1.1** You must follow all of Discord’s Terms of Service and Community Guidelines.\n" +
        "**1.2** You must be at least 13 years old to use this server.\n" +
        "**1.3** NSFW content (gore, pornography, extreme violence) is strictly prohibited.\n\n" +

        "__**2.0 — Community Conduct**__\n" +
        "**2.1** Harassment, hate speech, discrimination, and slurs are not tolerated.\n" +
        "**2.2** Raiding, spamming, or intentionally disrupting the server is forbidden.\n" +
        "**2.3** Use commands only in their designated channels.\n" +
        "**2.4** Do not flood chat or excessively spam messages, emojis, or pings.\n" +
        "**2.5** Impersonating staff or other users for personal gain is not allowed.\n" +
        "**2.6** Threats of harm or violence are strictly prohibited.\n" +
        "**2.7** Advertising unrelated servers or products without permission is not allowed.\n" +
        "**2.8** Drama must remain respectful. Excessive or toxic drama will lead to moderation.\n" +
        "**2.9** Please use English when chatting so staff can properly moderate.\n\n" +

        "__**3.0 — Voice Channel Rules**__\n" +
        "**3.1** All community rules also apply in voice channels.\n" +
        "**3.2** Do not use a loud, distorted, or disruptive microphone.\n" +
        "**3.3** Soundboards, music, and loud noises are only allowed in channels meant for them.\n\n" +

        "__**4.0 — Loopholes**__\n" +
        "**4.1** Bypassing or “working around” rules is treated the same as breaking them.\n" +
        "**4.2** Ban evading, mute evading, or alternate accounts to avoid punishment is prohibited."
      );

    await message.channel.send({ embeds: [embed] });
  },
};