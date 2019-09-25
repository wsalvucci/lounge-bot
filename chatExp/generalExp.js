const con = require('../database')
const bot = require('../bot')
const levelUp = require('../levelUp')

var cooldown = []

setInterval(() => {
    cooldown.forEach(user => {
        if (user.count > 0) {
            user.count--
        }
    });
}, 15000)

const addMessageExp = function(id, exp) {
    return new Promise(function(resolve, reject) {
        con.query('UPDATE user SET messages_sent = messages_sent + 1, total_exp = total_exp + ?, xp_from_chat = xp_from_chat + ? WHERE discord_id = ?',[
            exp,
            exp,
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

bot.on('message', msg => {
    if (msg.author.bot) return

    var cooldownExists = false
    var cooldownCount = 0
    cooldown.forEach(user => {
        if (user.id === msg.author.id) {
            cooldownExists = true
            user.count++
            cooldownCount = user.count
            console.log('Count: ' + cooldownCount + ' - Exp: ' + (30 / cooldownCount))
        }
    });
    if (!cooldownExists) {
        cooldown.push({'id': msg.author.id, 'count': 1})
        cooldownCount = 1
    }
    addMessageExp(msg.author.id, 30 / cooldownCount).then(() => {levelUp(msg.author.id)}).catch((err) => {console.err(err)})
})