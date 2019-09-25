SpellChecker = require('spell-checker-js')
SpellChecker.load('en')

const letters = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
]

function isWordSolved(selected, word) {
    var solved = true;
    word.split('').forEach(letter => {
        var solvedLetter = false;
        selected.forEach(selectedLetter => {
            if (letter.toUpperCase() === selectedLetter)
                solvedLetter = true;
        });
        if (!solvedLetter)
            solved = false;
    });
    return solved;
}

function hangmanMessage(triesLeft, available, selected, word) {
    var msg = 'Misses remaining: ' + triesLeft + '\n \n Letters Remaining:';
    available.forEach(letter => {
        msg += ' ' + letter;
    });
    msg += '\n \n ';
    word.split('').forEach(letter => {
        var letterPicked = false;
        selected.forEach(selectedLetter => {
            if (letter.toUpperCase() === selectedLetter)
                letterPicked = true;
        });
        if (letterPicked)
            msg += ' ' + letter;
        else
            msg += ' -';
    });
    return msg;
}

function hangmanSteps(oppChannel, channel, tries, availableLetters, selectedLetters, word) {
    return new Promise(function(resolve, reject) {

        if (tries < 0) {
            resolve(isWordSolved(selectedLetters, word));
        } else if (isWordSolved(selectedLetters, word)) {
            resolve(true);
        }
        else {
            const filter = m => m.content.startsWith('!!');
            channel.send(hangmanMessage(tries, availableLetters, selectedLetters, word));
            oppChannel.send(hangmanMessage(tries, availableLetters, selectedLetters, word));
            channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                .then(collected => {
                    const letter = collected.first().content.substring(2).toUpperCase();
                    for (var i = 0; i < availableLetters.length; i++) {
                        if (letter === availableLetters[i].toUpperCase()) {
                            selectedLetters.push(letter);
                            availableLetters.splice(i, 1);
                        }
                    }
                    var correctLetter = false;
                    word.split('').forEach(wordLetter => {
                        if (wordLetter.toUpperCase() === letter)
                            correctLetter = true;
                    });
                    if (!correctLetter)
                        tries--;
                    hangmanSteps(oppChannel, channel, tries, availableLetters, selectedLetters, word).then(result => {resolve(result)});
                })
                .catch(collected => {return false})
        }
        
        
    })
}

module.exports = function(player1, player2) {
    //Player one is the challenger who sends player two the word
    return new Promise(function(resolve, reject) {
        player1.createDM().then(channel => {
            channel.send('Submit the word you would like, preceding with !!. For example, to use the word `boxes`, you would send `!!umbrella` You have 60 seconds to decide.');
            const filter = m => m.content.startsWith('!!');
            channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                .then(collected => {
                    const word = collected.first().content.substring(2).toLowerCase();
                    const check = SpellChecker.check(word);
                    console.log(check);
                    if (check.length > 0) {
                        channel.send('Not a word.');
                    } else {
                        player2.createDM().then(channel2 => {
                            var tries = 5;
                            var availableLetters = letters.slice(0);
                            var selectedLetters = [];
                            channel2.send('Start guessing letters. Put a !! before the letter, i.e. `!!a` to select the letter a. You have ' + tries + ' attempts. If you take more than 60 seconds to send a letter, you will lose.');
                            hangmanSteps(channel, channel2, tries, availableLetters, selectedLetters, word).then(result => {
                                if (result)
                                    resolve(true);
                                else
                                    resolve(false);
                            });
                        })
                    }
                })
                .catch(collected => channel.send('Time expired'))
        })
    })
}