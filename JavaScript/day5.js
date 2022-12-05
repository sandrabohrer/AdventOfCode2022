var fs = require('fs'),
    _ = require('lodash');


function returnInput() {
    try {
        const data = fs.readFileSync('../data/day5.txt', 'utf8');
        var input = data.toString().split("\n").map(item => item.trim()),
            index = input.indexOf(''),
            crates = input.slice(0, index),
            moves = input.slice(index);

        return [
            crates,
            moves
        ];
    } catch (err) {
        console.error(err);
    }
}

function test() {
    var cratesAndMoves = returnInput(),
        crates = cratesAndMoves[0],
        moves = cratesAndMoves[1];
    
    return crates;
}

console.log(test());