const {RichEmbed} = require('discord.js')
const con = require('../database')
const bot = require('../bot')

const getUserData = function(id) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM user WHERE discord_id = ?',[
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,7) == '!!stats') {
        var id = msg.author.id
        getUserData(id).then((data) => {
            data = data[0]
            var totalXp = 0
            for (var i=0; i <= data['cur_level']; i++) {
                totalXp = totalXp+(300 * Math.pow(2,(i+1)/7))
            }
            var embed = new RichEmbed()
                .setAuthor(msg.guild.members.get(msg.author.id).nickname)
                .setThumbnail(msg.author.avatarURL)
                .setTitle('Level ' + data['cur_level'])
                .setDescription(data['total_exp'] + '/' + Math.ceil(totalXp))
            msg.reply(embed).then(msg.delete()).catch((err) => {console.error(err)})
        }, (err) => {
            console.error(err)
        })
    }
})