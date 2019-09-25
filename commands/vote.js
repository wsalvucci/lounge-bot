const Discord = require('discord.js')
const bot = require('../bot')

var playersWithPolls = []

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,7) === '!!vote ') {
        const author = msg.author;
        const parts = msg.content.split(' ');
        var question;
        var time = 300000;
        if (parts[1].toLowerCase() === 'time') {
            time = (parts[2] * 60) * 1000;
            if (time > 3600000) {
                msg.reply('Too long a time set. Max time is 1 hour');
                return;
            } else if (time < 30000) {
                msg.reply('Too short a time set. Min time is 30 seconds');
                return;
            }
            if (isNaN(time)) {
                msg.reply('Invalid time set!');
                return;
            } else {
                question = parts;
                question.splice(0, 3);
                question = question.join(' ');
            }
        } else {
            question = msg.content.substring(7);
        }
        var alreadyPoll = false;
        playersWithPolls.forEach(player => {
            if (player.id === author.id) {
                alreadyPoll = true;
            }
        });
        if (!alreadyPoll) {
            playersWithPolls.push(author);
            questionEmbed = new Discord.RichEmbed();
            questionEmbed.setAuthor(author.username, author.avatarURL);
            questionEmbed.setDescription(question);
            questionEmbed.addField('Duration', ((time / 1000) / 60) + ' minutes');
            msg.guild.channels.get('552717685239316500').send(questionEmbed).then(message => {
                var filter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❌'
                var collector = message.createReactionCollector(filter, {time: time});
                message.react('✅').then(
                    message.react('❌').catch(console.error)
                ).catch(console.error);
                collector.on('end', collected => {
                    for (var i = 0; i < playersWithPolls.length; i++) {
                        if (playersWithPolls[i].id == author.id) {
                            playersWithPolls.splice(i,1);
                        }
                    }
                    var yes = collected.get('✅').count;
                    var no = collected.get('❌').count;
                    var richEmbed = new Discord.RichEmbed();
                    richEmbed.setDescription(question);
                    richEmbed.addField('Yes', yes, true);
                    richEmbed.addField('No', no, true);
                    richEmbed.setAuthor(author.username);
                    if (yes > no) {
                        richEmbed.setColor('#00FF00');
                        richEmbed.setTitle('Passed');
                    } else if (yes < no) {
                        richEmbed.setColor('#FF0000');
                        richEmbed.setTitle('Failed');
                    } else if (yes === no) {
                        richEmbed.setColor('#808080');
                        richEmbed.setTitle('Tie');
                    }
                    message.channel.send(richEmbed);
                    message.delete().catch(console.error);
                    msg.delete().catch(console.error);
                })
            });
        } else {
            msg.reply('You already are running a poll!')
        }
    }
})