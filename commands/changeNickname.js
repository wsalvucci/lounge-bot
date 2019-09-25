const con = require('../database')
const bot = require('../bot')

const getLvl = function(id) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT cur_level FROM user WHERE discord_id = ?',[
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const updateNickname = function(id, name) {
    return new Promise(function(resolve, reject) {
        con.query('UPDATE user SET nickname = ? WHERE discord_id = ?',[
            name,
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,10) == '!!nickname') {
        const nicknameParts = msg.content.split(' ').splice(1);
        var nickname = nicknameParts[0];
        for (var i=1; i < nicknameParts.length; i++) {
            nickname += ' ' + nicknameParts[i];
        }
        const guild = msg.channel.guild;
        if (guild.available) {
            guild.fetchMember(msg.author).then(member => {
                getLvl(msg.author.id).then((data) => {
                    if (data.length === 0) {
                        member.setNickname(nickname).catch(err => {console.log(err)})
                    } else {
                        member.setNickname('Lv' + data[0]['cur_level'] + ' ' + nickname).catch(err => {console.log(err)})
                    }
                    updateNickname(msg.author.id, nickname).catch((err) => {console.error(err)})
                })
            }).catch(err => console.error(err))
        }
    }
})