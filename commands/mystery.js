const bot = require('../bot')
const moment = require('moment')



bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,9) === '!!mystery') {
        var random = Math.random();
        const guildAuthor = msg.guild.members.get(msg.author.id).nickname;
        var authorName = guildAuthor;
        if (authorName === undefined) {
            authorName = msg.author.username;
        }


    }
})