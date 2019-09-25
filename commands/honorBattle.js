const bot = require('../bot')
const hangman = require('../games/hangman')

var playersInBattles = [];

function checkIfInBattle(player) {
    var fighting = false;
    playersInBattles.forEach(fighter => {
        if (fighter.id === player.id)
            fighting = true;
    });
    return fighting;
}

function nicknameWager(channel, player1, player2, gameMode) {
    return new Promise(function(resolve, reject) {
        if (gameMode === 'hangman') {
            /*
                True player 2 won
                False player 1 won
            */
            hangman(player1, player2).then(result => {
                if (result) {
                    channel.send(player2.username + ' defeated ' + player1.username + '!');
                } else {
                    channel.send(player1.username + ' defeated ' + player2.username + '!');
                }
                resolve(result)
            });
        }
    })
}

bot.on('message', msg => {
    if (msg.content.toLowerCase().substring(0,13) == '!!honorbattle') {
        if (msg.content.toLowerCase().substring(14,22) == 'nickname') {
            if (msg.content.toLowerCase().substring(23,30) == 'hangman') {
                if (msg.mentions.users.size !== 0) {
                    const opponent = msg.mentions.users.first();
                    console.log(playersInBattles);
                    if (!checkIfInBattle(msg.author)) {
                        if (!checkIfInBattle(opponent)) {
                            playersInBattles.push(msg.author, opponent);
                            nicknameWager(msg.channel, msg.author, opponent, 'hangman').then(result => {
                                playersInBattles.splice(playersInBattles.indexOf(msg.author), 1);
                                playersInBattles.splice(playersInBattles.indexOf(opponent), 1);
                            });
                        } else {
                            msg.reply('That player is already in a battle!');
                        }
                    } else {
                        msg.reply('You are already in a battle!');
                    }
                } else {
                    msg.reply('You have to mention the person you want to challenge!');
                }
            }
        }
    }
})