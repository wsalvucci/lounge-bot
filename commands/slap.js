const bot = require('../bot')
const moment = require('moment')

var cooldown = [];

function legendaryBadResponse(attacker, victim) {
    var responses = [
        victim + ' stared down ' + attacker + ' to remind them of the bitch they are, so they left the server',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function epicBadResponse(attacker, victim) {
    var responses = [
        '***' + attacker + ' whiffs like a bitch and gets absolutely curb stomped by ' + victim + '!***',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareBadResponse(attacker, victim) {
    var responses = [
        attacker + ' gets countered by ' + victim + ' and gets slapped instead!',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonBadResponse(attacker, victim) {
    var responses = [
        attacker + ' pops ' + victim + ' with the inside of their hand.',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function commonResponse(attacker, victim) {
    var responses = [
        attacker + ' smacks ' + victim + ' with the back of their hand',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' bitch slaps ' + victim + ' into the ground!',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' drops ' + victim + ' to the ground with a slap and slaps their corpse again!!',
        attacker + ' upper cuts ' + victim + '!! \n https://gfycat.com/powerlesscapitaliaerismetalmark',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function epicGoodResponse(attacker, victim) {
    var responses = [
        '***' + attacker + ' straight up punches the shit out of ' + victim + ' and then roundhouse kicks them!!!***',
        victim + ': "Why are you coming close to me?" \n' + attacker + ': "Well I cant beat the shit out of you without getting closer!" \n ***' + victim + ' got their head blown off by ' + attacker + 's slap!!!***',
        attacker + ': "***Hey ' + victim + '***." \n https://cdn.discordapp.com/attachments/517864914895765514/616093243834236929/image0.gif',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function legendaryGoodResponse(attacker, victim) {
    var responses = [
        '***FUS ROH DAH!*** \n https://gfycat.com/anothernippyfly \n ***' + victim + ' GOT HIT SO DAMN HARD THEY GOT KICKED FROM THE SERVER!*** You need to reinvite them...'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,6) === '!!slap') {
        var random = Math.random();
        const guildAuthor = msg.guild.members.get(msg.author.id);
        var authorName = authorName;
        if (authorName === undefined) {
            authorName = msg.author.username;
        }
        const target = msg.mentions.users.first();
        if (target === undefined) {
            msg.channel.send(authorName + ' slaps the air. Its not very effective...');
            return;
        } else {
            if (msg.author.id === target.id) {
                msg.channel.send(authorName + ' slapped themself in confusion......moron....');
            } else {
                console.log(cooldown);
                var newUser = true;
                var activeCooldown = false;
                if (target.id === bot.user.id) {
                    msg.channel.send('No');
                    return;
                }
                cooldown.forEach(user => {
                    if (user['id'] === msg.author.id) {
                        newUser = false;
                        console.log(moment(user['cooldown']).add(30, 'seconds'));
                        if (moment().isAfter(moment(user['cooldown']).add(30, 'seconds'))) {
                            user['cooldown'] = moment();
                        } else {
                            msg.reply('You still have a cooldown! ' + (30 - moment().diff(user['cooldown'], 'seconds')) + ' seconds...');
                            activeCooldown = true;
                        }
                    }
                });
                if (activeCooldown) {
                    msg.delete();
                    return;
                }
                if (newUser) {
                    cooldown.push({'id': msg.author.id, 'cooldown': moment()});
                }
                guildTarget = msg.guild.members.get(target.id);
                var targetName = guildTarget.nickname;
                if (guildTarget.nickname === null) {
                    targetName = target.username;
                }
                console.log(random);
                if (random <= 0.01) {
                    //<= 0.01 - 1%
                    guildAuthor.kick()
                    .then(msg.channel.send(legendaryBadResponse(authorName, targetName)))
                    .catch('I cannot kick this person...');
                } else if (random <= 0.05) {
                    //0.01 to 0.05 - 4%
                    msg.channel.send(epicBadResponse(authorName, targetName));
                } else if (random <= 0.10) {
                    //0.05 to 0.10 - 5%
                    msg.channel.send(rareBadResponse(authorName, targetName));
                } else if (random <= 0.25) {
                    //0.10 to 0.25 - 15%
                    msg.channel.send(uncommonBadResponse(authorName, targetName));
                } else if (random <= 0.75) {
                    //0.25 to 0.75 - 50%
                    msg.channel.send(commonResponse(authorName, targetName));
                } else if (random <= 0.90) {
                    //0.75 to 0.90 - 15%
                    msg.channel.send(uncommonGoodResponse(authorName, targetName));
                } else if (random <= 0.95) {
                    //0.90 to 0.95 - 5%
                    msg.channel.send(rareGoodResponse(authorName, targetName));
                } else if (random <= 0.99) {
                    //0.95 to 0.99 - 4%
                    msg.channel.send(epicGoodResponse(authorName, targetName));
                } else {
                    //>= 0.99 - 1%
                    guildTarget.kick()
                    .then(msg.channel.send(legendaryGoodResponse(authorName, targetName)))
                    .catch(error => msg.channel('I cannot kick this person...'))
                }
            }
        }
        msg.delete();
    }
})