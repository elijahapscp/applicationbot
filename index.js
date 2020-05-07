const {
    Client,
    Collection
} = require("discord.js");
const Discord = require("discord.js");
const {
    config
} = require("dotenv");
const fs = require("fs");
const client = new Client({
    disableEveryone: true
});

let coins = require("./coins.json");

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence("Playing with blocks", {
        type: "PLAYING"
    });

    client.user.setPresence({
        status: "online",
        game: {
            name: "GAME",
            type: "PLAYING"
        }
    });
});

client.on("message", async message => {
    const prefix = "%";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    if (coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 2) + 1;
    let baseAmt = Math.floor(Math.random() * 2) + 1;

    if (coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});

client.login(process.env.token);