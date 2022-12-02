var fs = require('fs'),
    _ = require('lodash');


function returnStrategyGuide() {
    try {
        const data = fs.readFileSync('../data/day2.txt', 'utf8');
        var strategyGuide = data.toString().split("\n").map(item => item.trim());

        return strategyGuide;
    } catch (err) {
        console.error(err);
    }
}

function returnConvertedStrategyGuide() {
    var strategyGuide = returnStrategyGuide(),
        arrayOfStrategies = _.invokeMap(strategyGuide, String.prototype.split, ' '),
        opponentSelection = '',
        yourSelection = '',
        convertedStrategies = [];

    _.forEach(arrayOfStrategies, function(eachStrategy, index) {
        // The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors.
        if (eachStrategy[0] === 'A') {
            opponentSelection = 'Rock';
        } else if (eachStrategy[0] === 'B') {
            opponentSelection = 'Paper';
        } else if (eachStrategy[0] === 'C') {
            opponentSelection = 'Scissors';
        } else {
            opponentSelection = '';
        }

        // The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors.
        if (eachStrategy[1] === 'X') {
            yourSelection = 'Rock';
        } else if (eachStrategy[1] === 'Y') {
            yourSelection = 'Paper';
        } else if (eachStrategy[1] === 'Z') {
            yourSelection = 'Scissors';
        } else {
            yourSelection = '';
        }

        convertedStrategies.push([opponentSelection, yourSelection]);
    });

    return convertedStrategies;
}

function returnYourFinalScore() {
    var strategyGuide = returnConvertedStrategyGuide(),
        opponentScore = 0,
        youScore = 0,
        overallScores = {},
        rockAmount = 1,
        paperAmount = 2,
        scissorsAmount = 3,
        lossAmount = 0,
        drawAmount = 3,
        winAmount = 6;

    _.forEach(strategyGuide, function(eachStrategy) {
        // eachStrategy[0] = opponent
        // eachStrategy[1] = you

        if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'Rock') {
            // draw
            opponentScore += drawAmount + rockAmount;
            youScore += drawAmount + rockAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'Paper') {
            // draw
            opponentScore += drawAmount + paperAmount;
            youScore += drawAmount + paperAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'Scissors') {
            // draw
            opponentScore += drawAmount + scissorsAmount;
            youScore += drawAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'Paper') {
            // you
            opponentScore += lossAmount + rockAmount;
            youScore += winAmount + paperAmount;
        } else if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'Scissors') {
            // opponent
            opponentScore += winAmount + rockAmount;
            youScore += lossAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'Scissors') {
            // you
            opponentScore += lossAmount + paperAmount;
            youScore += winAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'Rock') {
            // opponent
            opponentScore += winAmount + paperAmount;
            youScore += lossAmount + rockAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'Rock') {
            // you
            opponentScore += lossAmount + scissorsAmount;
            youScore += winAmount + rockAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'Paper') {
            // opponent
            opponentScore += winAmount + scissorsAmount;
            youScore += lossAmount + paperAmount;
        } else {
            outcome = '';
            youScore = 0;
            opponentScore = 0;
        }
    });

    overallScores = {
        opponentFinalScore: opponentScore,
        youFinalScore: youScore
    };

    return overallScores.youFinalScore;
}

function returnPart2ConvertedStrategyGuide() {
    var strategyGuide = returnStrategyGuide(),
        arrayOfStrategies = _.invokeMap(strategyGuide, String.prototype.split, ' '),
        opponentSelection = '',
        outcome = '',
        convertedStrategies = [];

    _.forEach(arrayOfStrategies, function(eachStrategy, index) {
        // The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors.
        if (eachStrategy[0] === 'A') {
            opponentSelection = 'Rock';
        } else if (eachStrategy[0] === 'B') {
            opponentSelection = 'Paper';
        } else if (eachStrategy[0] === 'C') {
            opponentSelection = 'Scissors';
        } else {
            opponentSelection = '';
        }

        // ... the second column says how the round needs to end:
        // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
        if (eachStrategy[1] === 'X') {
            outcome = 'opponent';
        } else if (eachStrategy[1] === 'Y') {
            outcome = 'draw';
        } else if (eachStrategy[1] === 'Z') {
            outcome = 'you';
        } else {
            outcome = '';
        }

        convertedStrategies.push([opponentSelection, outcome]);
    });

    return convertedStrategies;
}

function returnYourPart2FinalScore() {
    var strategyGuide = returnPart2ConvertedStrategyGuide(),
        opponentScore = 0,
        youScore = 0,
        overallScores = {},
        rockAmount = 1,
        paperAmount = 2,
        scissorsAmount = 3,
        lossAmount = 0,
        drawAmount = 3,
        winAmount = 6;

    _.forEach(strategyGuide, function(eachStrategy) {
        // eachStrategy[0] = opponent
        // eachStrategy[1] = outcome
        // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

        if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'draw') {
            // you = rock
            opponentScore += drawAmount + rockAmount;
            youScore += drawAmount + rockAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'draw') {
            // you = paper
            opponentScore += drawAmount + paperAmount;
            youScore += drawAmount + paperAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'draw') {
            // you = scissors
            opponentScore += drawAmount + scissorsAmount;
            youScore += drawAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'you') {
            // you = paper
            opponentScore += lossAmount + rockAmount;
            youScore += winAmount + paperAmount;
        } else if (eachStrategy[0] === 'Rock' && eachStrategy[1] === 'opponent') {
            // you = scissors
            opponentScore += winAmount + rockAmount;
            youScore += lossAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'you') {
            // you = scissors
            opponentScore += lossAmount + paperAmount;
            youScore += winAmount + scissorsAmount;
        } else if (eachStrategy[0] === 'Paper' && eachStrategy[1] === 'opponent') {
            // you = rock
            opponentScore += winAmount + paperAmount;
            youScore += lossAmount + rockAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'you') {
            // you = rock
            opponentScore += lossAmount + scissorsAmount;
            youScore += winAmount + rockAmount;
        } else if (eachStrategy[0] === 'Scissors' && eachStrategy[1] === 'opponent') {
            // you = paper
            opponentScore += winAmount + scissorsAmount;
            youScore += lossAmount + paperAmount;
        } else {
            outcome = '';
            youScore = 0;
            opponentScore = 0;
        }
    });

    overallScores = {
        opponentFinalScore: opponentScore,
        youFinalScore: youScore
    };

    return overallScores.youFinalScore;
}

console.log('Your part 1 final score is: ' + returnYourFinalScore());
console.log('Your part 2 final score is: ' + returnYourPart2FinalScore());