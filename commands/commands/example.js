module.exports = {
    name: "example",
    category: "commands",
    description: "Testing commands",

    run: async(client, message, args) => {
        const filter = m => m.author.id === message.author.id;
        message.reply("Test command. Expires in 10 seconds");
        message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
        }
        )}
};