module.exports = {
    name: "spin",
    category: "games",
    description: "Spins a draw",

    run: async (client, message, args) => {
        const author = message.author;
        message.channel.send(`${author} started a draw! React for a chance to win!`).then(function (message) {
            message.react("✅")
        });

        const users = message.react.users;

        setTimeout(function () {
            message.channel.send("Rolling the draw.")
            }), 15000;}
    };
