const bot = require('../bot')

bot.on('message', msg => {
	if (msg.content.toLowerCase() === '!!donttalk') {
		msg.channel.send('https://cdn.discordapp.com/attachments/517864914895765514/637112866851389440/mvnulol.png').catch(console.error)
	}
})
