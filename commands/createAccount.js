const con = require('../database')
const bot = require('../bot')
const moment = require('moment')

const checkForAccount = function(userId) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM user WHERE discord_id=?',[
            userId,
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const createAccount = function(userId, name) {
    return new Promise(function(resolve, reject) {
        con.query('INSERT INTO user (discord_id, nickname, time_created) VALUES (?,?,?)',[
            userId,
            name,
            Date.now() / 1000,
        ], function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

bot.on('message', msg => {
    console.log('msg');
    if (msg.content.toLowerCase().substring(0,15) === '!!createaccount') {
        checkForAccount(msg.author.id).then((data) => {
            if (data.length !== 0) {
                msg.reply('You already have an account!');
            } else {
                createAccount(msg.author.id, msg.author.username).then((data) => {
                    msg.reply('Account created!');
                }, (err) => {
                    console.error(err);
                })
            }
        }, (err) => {
            console.error(err);
        })
    }
})