const con = require('./database')
const bot = require('./bot')

const getExpLvl = function(id) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT total_exp, cur_level FROM user WHERE discord_id = ?',[
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const levelUp = function(id) {
    return new Promise(function(resolve, reject) {
        con.query('UPDATE user SET cur_level = cur_level + 1 WHERE discord_id = ?', [
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getNickname = function(id) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT nickname FROM user WHERE discord_id = ?',[
            id
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = function(id) {
    response = {
        'level': 0,
        'leveledUp': false,
        'exp': 0
    }
    getExpLvl(id).then((data) => {
        if (data.length === 0) {
            console.log('No xp data for id searched: ' + id)
            return null
        } else {
            response['level'] = data[0]['cur_level'];
            response['exp'] = data[0]['total_exp'];
            var totalXp = 0
            for (var i=0; i <= response['level']; i++) {
                totalXp = totalXp+(300 * Math.pow(2,(i+1)/7))
            }
            if (totalXp < response['exp']) {
                response['leveledUp'] = true
                bot.fetchUser(id).then((user) => {
                    user.createDM().then((dmChannel) => {
                        dmChannel.send('Congratulations! You leveled up! You are now level ' + (++response['level']) + '!')
                    })
                })
                getNickname(id).then((data) => {
                    console.log('setting new nickname')
                    if (data.length !== 0) {
                        console.log('data found')
                        baseName = data[0]['nickname']
                        bot.guilds.map(guild => {
                            guild.fetchMember(id).then((member) => {
                                console.log('Setting name...')
                                member.setNickname('Lv' + response['level'] + ' ' + baseName).catch((err) => {console.error(err)})
                            })
                        })
                    }
                })
                levelUp(id).catch((err) => {console.error(err)})
            }
            return response
        }
    }, (err) => {
        console.error(err)
        return null
    })
}