const bot = require('../bot')


bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,7) == '!!color') {
        const color = msg.content.toUpperCase().split(' ')[1];
        const guild = msg.channel.guild;
        if (guild.available) {
            var role = guild.roles.find(val => val.name === msg.author.tag);
            if (role === null) {
                guild.createRole({
                    name: msg.author.tag,
                    color: color,
                }).then(newRole => {
                    guild.fetchMember(msg.author).then(member => {
                        member.addRole(newRole);
                    })
                })
            } else {
                role.setColor(color).catch(error => msg.reply('Error: Probably an invalid color'));
            }
        }
    }
})