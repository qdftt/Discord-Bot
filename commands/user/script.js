const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "script",
    aliases: ["script"],
  },
  run: async (bot, message, args) => {
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setTitle("DMON Roblox Script")
      .setDescription(
        "```lua\nloadstring(game:HttpGet(\"http://dmonmods.xyz/loader.txt\"))()\```"
      )
      .setColor("#de5139");

    await message.channel.send({ embeds: [embed] });
  },
};
