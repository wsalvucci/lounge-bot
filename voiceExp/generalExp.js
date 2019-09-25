const con = require('../database')
const bot = require('../bot')
const levelUp = require('../levelUp')

const giveVoiceExp = function(id, members) {
    return new Promise(function(resolve, reject) {
        con.query('UPDATE user SET seconds_voice = seconds_voice + 1, total_exp = total_exp + ?, xp_from_voice = xp_from_voice + ? WHERE discord_id = ?',[
            members,
            members,
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

bot.on('ready', () => {
    bot.guilds.map((guild) => {
        guild.channels.map((channel) => {
            if (channel.type == 'voice') {
                setInterval(() => {
                    channel.members.map((member) => {
                        if (member.id === '235088799074484224') return
                        var numMembers = 0
                        channel.members.forEach(otherMember => {
                            if (otherMember.id !== '235088799074484224' && otherMember.id !== member.id) numMembers++
                        });
                        giveVoiceExp(member.id, numMembers).then(() => {levelUp(member.id)}).catch((err) => {console.error(err)})
                    })
                }, 1000)
            }
        })
    })
})