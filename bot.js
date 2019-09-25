const Discord = require('discord.js')
const client = new Discord.Client()
const key = require('./botkey')

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
})

client.login(key);

module.exports = client