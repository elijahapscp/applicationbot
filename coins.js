const Discord = require("discord.js");
let coins = require("./coins.json")

module.exports.run = async (bot, message, args) => {
    let uCoins = coins[message.author.id].coins;

    message.channel.send(`${message.author} has ${uCoins}`);

}

module.exports.help = {
    name: "coins"
}