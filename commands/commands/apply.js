const {
    promptMessage
} = require("../../functions.js");
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
        name: "apply",
        category: "commands",
        description: "Sends the user a dm to apply for a server role or something",

        run: async (client, message, args) => {
        message.channel.send("I sent you a DM!");
        const channelid = message.channel.id;

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setImage('https://imgur.com/SIIjJvy.png')
            .setTitle('Furry Arcadia Mod Applications');

        await message.author.send(embed);

        await message.author.send("Please answer the following questions truthfully.");
        await message.author.send("What is your name?");

        const filter = m => m.author.id === message.author.id

        message.author.dmChannel.awaitMessages(filter, {
                max: 1,
                time: 1200000
            }).then(collected => {
            let name = collected.first();

            message.author.send("How old are you?")
            message.author.dmChannel.awaitMessages(filter, {
                max: 1,
                time: 1200000
            }).then(collected => {
            let age = collected.first();

            message.author.send("What is your gender?")
            message.author.dmChannel.awaitMessages(filter, {
                max: 1,
                time: 1200000
            }).then(collected => {
                let gender = collected.first();

                message.author.send("Why would you like to be moderator? (Please add more than 10 words!)")
                message.author.dmChannel.awaitMessages(filter, {
                    max: 1,
                    time: 1200000
                }).then(collected => {
                let reason = collected.first();

                const embed2 = new MessageEmbed()
                    .setTitle(`Your Furry Arcadia's Application`)
                    .setColor("BLUE")
                    .setDescription(`Name: '${name}',\nAge: '${age}',\nGender: '${gender}',\nReason: '${reason}'`);

            message.author.send(embed2).then(async msg => {
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅")
            {
                message.author.send("Sent to the moderators for review!");

                message.channel.send(`${message.author}'s Application`)
                const embed2 = new MessageEmbed()
                    .setTitle(`Furry Arcadia's Applications`)
                    .setColor("BLUE")
                    .setDescription(`Name: '${name}',\nAge: '${age}',\nGender: '${gender}',\nReason: '${reason}'`);

            message.channel.send(embed2)
            }
            else
            {
                message.author.send("It's okay! Run this command in the server again to try again!");
            }

            });
            message.author.send("\nDoes this look good?")

            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
        }).catch(err => {
            console.log(err)
        })
    }
)}
};