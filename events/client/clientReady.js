module.exports = async (bot) => {

    // Bot is fully online
    console.log(`${bot.user.tag} is now online.`);
    console.log("Bot Made By qdft");
    console.log("DMON is the best bot out there just saying");
    console.log("DMON is best <3");

    // Small delay ensures Discord is fully ready
    setTimeout(() => {
        bot.user.setActivity("over DMON", { type: 3 }); // 3 = WATCHING
    }, 1000);
};