const bot = require('../bot')

charges = []

setInterval(() => {
    charges.forEach(user => {
        if (user.count < 10) {
            user.count++
        }
    });
}, 30000)

bot.on('message', msg => {
    if (msg.content.toLowerCase() === '!!spamcharges') {
        userExists = false
        charges.forEach(user => {
            if (user.id === msg.author.id) {
                userExists = true
                msg.reply(user.count + ' charges available')
            }
        });
        if (!userExists) {
            charges.push({'id': msg.author.id, 'count': 10})
            msg.reply('10 charges available')
        }
    }
})

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,7) === '!!spam ') {
        if (msg.mentions.users.size !== 0) {
            msgParts = msg.content.split(' ')
            console.log(msgParts)
            if (!isNaN(msgParts[1])) {
                spamCount = msgParts[1]
                if (spamCount > 0) {
                    userExists = false
                    charges.forEach(user => {
                        if (user.id === msg.author.id) {
                            userExists = true
                            if (spamCount <= user.count) {
                                user.count -= spamCount
                                for (var i=0; i < spamCount; i++) {
                                    msg.channel.send('<@' + msg.mentions.users.first().id + '>')
                                }
                            } else {
                                msg.reply('You only have ' + user.count + ' charges')
                            }
                        }
                    });
                    if (!userExists) {
                        charges.push({'id': msg.author.id, 'count': 10})
                        if (spamCount <= 10) {
                            for (var i=0; i < spamCount; i++) {
                                msg.channel.send('<@' + msg.mentions.users.first().id + '>')
                            }
                        } else {
                            msg.reply('You only have 10 charges')
                        }
                    }
                } else {
                    msg.reply('You cannot pick an amount less than 0')
                }
            } else {
                msg.reply('You need to give the number of charges you want to spend')
            }
        } else {
            msg.reply('You have to pick someone to spam!')
        }
    }
})