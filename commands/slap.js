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
        attacker + ', you talking mad shit for someone that is about to get kicked...',
        victim + ': Get off me, bitch... \n https://media.giphy.com/media/mWcxXyXiUZ4Zi/giphy.gif',
        attacker + ' whails ' + victim + ' in the face and- \n https://media.giphy.com/media/YWWmelTdszDF9V3pvK/giphy.gif \n \n ...oh no...',
        '***Live look at ' + attacker + ' trying to slap ' + victim + '*** \n https://media.giphy.com/media/I6plPWpNVEKIM/giphy.gif',
        victim + ': GET THE FUCK OUTTA MY WAY ' + attacker + ' \n https://media.giphy.com/media/3oriNZNKQIeMsf6mmk/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareBadResponse(attacker, victim) {
    var responses = [
        attacker + ' gets countered by ' + victim + ' and gets slapped instead!',
        attacker + ' thinks he can slap someone...lol \n https://media.giphy.com/media/TD0NYrLpcnsTm/giphy.gif',
        victim + ' whails ' + attacker + ' with a counter attack! \n https://media.giphy.com/media/ESbUBSDJmD3Mc/giphy.gif',
        'Get lost' + attacker,
        'Nobody asked for you ' + attacker + ' \n https://tenor.com/xrPo.gif',
        attacker + ' tried picking a fight out of their league \n https://media.giphy.com/media/RBZJldqvl7XAA/giphy.gif',
        attacker + ' used kick on ' + victim + '! ' + attacker + ' hurt itself in confusion! \n https://media.giphy.com/media/xIZylOBSSTlLy/giphy.gif',
        attacker + ' tried to tackle ' + victim + ' but got denied!! \n https://media.giphy.com/media/2xPJxEc8mVlYNA4J1H/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonBadResponse(attacker, victim) {
    var responses = [
        attacker + ' tried to smack ' + victim + ', but they missed...',
        '*woooosh* \n ' + attacker + ' slap against ' + victim + ' hits nothing but air...',
        attacker + ': Swing and a miss! \n https://media.giphy.com/media/QPxSQDvByu1G0/giphy.gif',
        '***HEY BREAK IT UP ' + attacker + ' and ' + victim + '!!*** \n https://media.giphy.com/media/4b0EQh1BlkWCk/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function commonResponse(attacker, victim) {
    var responses = [
        attacker + ' pops ' + victim + ' with the inside of their hand.',
        attacker + ' smacks ' + victim + ' with the back of their hand',
        '*thwack* \n ' + attacker + ' slaps ' + victim + ' across the cheek'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' bitch slaps ' + victim + ' into the ground! \n http://gph.is/Z0G3pT',
        attacker + ': "THERE CAN ONLY BE ONE OF US, ' + victim + '!!! \n https://media.giphy.com/media/mFwlk5Fg6znWWhBDji/giphy.gif',
        attacker + ' slashes ' + victim + ' across the face! \n https://media.giphy.com/media/NmbDXsi4FzpcY/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' drops ' + victim + ' to the ground with a slap and slaps their corpse again!!',
        attacker + ' upper cuts ' + victim + '!! \n https://gfycat.com/powerlesscapitaliaerismetalmark',
        attacker + ' unleashes the multi-punch against ' + victim + '! \n https://tenor.com/view/%e9%ba%bb%e5%b9%be%e5%85%94-punch-gif-14162290',
        attacker + ': "HEY ' + victim.toUpperCase() + '!!! \n http://gph.is/2qDEQdM',
        '***' + attacker + ' straight up punches the shit out of ' + victim + ' and then roundhouse kicks them!!!***',
        attacker + ': Hey there, ' + victim + '!! \n https://media.giphy.com/media/Ksbd9VWBvHefK/giphy.gif',
        attacker + ' breathes on ' + victim + 's face... \n https://media.giphy.com/media/69yrZWuu7clVYvmtJi/giphy.gif',
        attacker + ' runs up to ' + victim + '. "***HIYA!!!***" \n https://media.giphy.com/media/Fmp9dqwy6XcY/giphy.gif',
        attacker + ' runs ' + victim + ' over! \n https://media.giphy.com/media/jwKC0qlOoXmcLDB4vC/giphy.gif',
        attacker + ' assaults ' + victim + ' with a quad! \n https://media.giphy.com/media/xULW8NuFfWPMUqxK92/giphy.gif',
        attacker + ' MOVE ' + victim + '!! GET OUT THE WAY! \n https://media.giphy.com/media/F09NFq9b23Xpu/giphy.gif',
        attacker + ' yeets ' + victim + ' off a cliff! \n https://media.giphy.com/media/5gfsg2p6B148U/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function epicGoodResponse(attacker, victim) {
    var responses = [
        victim + ': "Why are you coming close to me?" \n' + attacker + ': "Well I cant beat the shit out of you without getting closer!" \n ***' + victim + ' got their head blown off by ' + attacker + 's slap!!!***',
        attacker + ': "***Hey ' + victim + '***." \n https://cdn.discordapp.com/attachments/517864914895765514/616093243834236929/image0.gif',
        '***' + attacker + ' SUMMONS PRESIDENT TRUMP AND BEATS THE SHIT OUT OF ' + victim + ' WITH HIM!!*** \n https://media.giphy.com/media/10S1a1PhRypYn6/giphy.gif',
        attacker + 'takes aim at ' + victim + '..... \n \n \n https://tenor.com/view/dick-punch-gif-5091485'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function legendaryGoodResponse(attacker, victim) {
    var responses = [
        '***FUS ROH DAH!*** \n https://gfycat.com/anothernippyfly \n ***' + victim + ' GOT HIT SO DAMN HARD THEY GOT KICKED FROM THE SERVER!*** You need to reinvite them...',
        '***' + attacker + ' TAKES AIM \n LAUNCHES A STRIKE \n AAAAAANNNDD-*** \n https://media.giphy.com/media/VXJWhaO7afRe/giphy.gif \n \n ...yeah they dead...'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,6) === '!!slap') {
        var random = Math.random();
        const guildAuthor = msg.guild.members.get(msg.author.id).nickname;
        var authorName = guildAuthor;
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