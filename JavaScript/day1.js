var fs = require('fs'),
    _ = require('lodash');


function returnAllCalories() {
    try {
        const data = fs.readFileSync('../data/day1.txt', 'utf8');
        var arrayOfCalories = data.toString().split("\n").map(item => item.trim());
        arrayOfCalories = arrayOfCalories.map(Number);

        return arrayOfCalories;
    } catch (err) {
        console.error(err);
    }
}

function findItems(items, searchFor) {
    var index = 0,
        indexes = [];

    while(index != -1){
        index = _.indexOf(items, searchFor, index);

        if (index != -1) {
            indexes.push(index);
            index++;
        }
    }
    return indexes;
}

function returnSumOfCalories() {
    var arrayOfCalories = returnAllCalories(),
        emptyCalories = findItems(arrayOfCalories, 0),
        elfGroups = [],
        calorieStart = 0,
        elves,
        sumOfCalories = [];

    // break calories into individual arrays
    _.forEach(emptyCalories, function(emptyCalorieLocation) {
        elves = arrayOfCalories.slice(calorieStart, emptyCalorieLocation);

        elfGroups.push(elves);

        calorieStart = emptyCalorieLocation + 1;
    });

    // push the final chunk of calories
    elves = arrayOfCalories.slice(_.last(emptyCalories) + 1);
    elfGroups.push(elves);

    // sum up each chunk of calories
    _.forEach(elfGroups, function(group) {
        sumOfCalories.push(_.sum(group));
    });

    return sumOfCalories;
}

console.log('The max number of calories is: ' + _.max(returnSumOfCalories()));
