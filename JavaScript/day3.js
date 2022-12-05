var fs = require('fs'),
    _ = require('lodash');


function returnAllRucksacks() {
    try {
        const data = fs.readFileSync('../data/day3.txt', 'utf8');
        var rucksacks = data.toString().split("\n").map(item => item.trim());

        return rucksacks;
    } catch (err) {
        console.error(err);
    }
}

function returnRucksackCompartmentsPart1() {
    var rucksacks = returnAllRucksacks(),
        compartment1,
        compartment2,
        rucksackCompartments = [];

    // break rucksacks into individual compartments
    _.forEach(rucksacks, function(rucksack) {
        compartment1 = rucksack.slice(0, rucksack.length/2);
        compartment2 = rucksack.slice(rucksack.length/2);

        rucksackCompartments.push([compartment1, compartment2]);
    });

    return rucksackCompartments;
}

function returnCommonItemTypesPart1() {
    var rucksackCompartments = returnRucksackCompartmentsPart1(),
        commonItemTypes = [],
        numberOfMatches = 0;

    _.forEach(rucksackCompartments, function(compartments) {
        numberOfMatches = 0;

        _.forEach(compartments[0], function(compartment1Item) {
            _.forEach(compartment1Item, function(item1) {
                _.forEach(compartments[1], function(item2) {
                    if (item1 === item2 && numberOfMatches === 0) {
                        numberOfMatches += 1;
                        commonItemTypes.push(item1);
                    }
                });
            });
        });
    });

    return commonItemTypes;
}

function returnSumOfItems(commonItemTypes) {
    var itemNumericalValues = [],
        value = 0;

    _.forEach(commonItemTypes, function(item) {
        value = 0;
        // Lowercase item types a through z have priorities 1 through 26.
        // Uppercase item types A through Z have priorities 27 through 52.
        switch(item) {
            case 'a':
                value = 1;
                break;
            case 'b':
                value = 2;
                break;
            case 'c':
                value = 3;
                break;
            case 'd':
                value = 4;
                break;
            case 'e':
                value = 5;
                break;
            case 'f':
                value = 6;
                break;
            case 'g':
                value = 7;
                break;
            case 'h':
                value = 8;
                break;
            case 'i':
                value = 9;
                break;
            case 'j':
                value = 10;
                break;
            case 'k':
                value = 11;
                break;
            case 'l':
                value = 12;
                break;
            case 'm':
                value = 13;
                break;
            case 'n':
                value = 14;
                break;
            case 'o':
                value = 15;
                break;
            case 'p':
                value = 16;
                break;
            case 'q':
                value = 17;
                break;
            case 'r':
                value = 18;
                break;
            case 's':
                value = 19;
                break;
            case 't':
                value = 20;
                break;
            case 'u':
                value = 21;
                break;
            case 'v':
                value = 22;
                break;
            case 'w':
                value = 23;
                break;
            case 'x':
                value = 24;
                break;
            case 'y':
                value = 25;
                break;
            case 'z':
                value = 26;
                break;
            case 'A':
                value = 27;
                break;
            case 'B':
                value = 28;
                break;
            case 'C':
                value = 29;
                break;
            case 'D':
                value = 30;
                break;
            case 'E':
                value = 31;
                break;
            case 'F':
                value = 32;
                break;
            case 'G':
                value = 33;
                break;
            case 'H':
                value = 34;
                break;
            case 'I':
                value = 35;
                break;
            case 'J':
                value = 36;
                break;
            case 'K':
                value = 37;
                break;
            case 'L':
                value = 38;
                break;
            case 'M':
                value = 39;
                break;
            case 'N':
                value = 40;
                break;
            case 'O':
                value = 41;
                break;
            case 'P':
                value = 42;
                break;
            case 'Q':
                value = 43;
                break;
            case 'R':
                value = 44;
                break;
            case 'S':
                value = 45;
                break;
            case 'T':
                value = 46;
                break;
            case 'U':
                value = 47;
                break;
            case 'V':
                value = 48;
                break;
            case 'W':
                value = 49;
                break;
            case 'X':
                value = 50;
                break;
            case 'Y':
                value = 51;
                break;
            case 'Z':
                value = 52;
                break;
            default:
                value = 0;
        }

        itemNumericalValues.push(value);
    });

    return _.sum(itemNumericalValues);
}

function returnRucksackCompartmentsPart2() {
    var rucksacks = returnAllRucksacks(),
        elfGroups = []
        groupSize = 3;

    elfGroups = rucksacks.map( function(e,i){ 
        return i % groupSize === 0 ? rucksacks.slice(i,i+groupSize) : null; 
   }).filter(function(e){ return e; });
    
    return elfGroups;
}

function returnCommonItemTypesPart2() {
    var elfGroups = returnRucksackCompartmentsPart2(),
        commonItemTypes = [],
        numberOfMatches = 0;

    _.forEach(elfGroups, function(group) {
        numberOfMatches = 0;

        _.forEach(group[0], function(group1) {
            _.forEach(group1, function(item1) {
                _.forEach(group[1], function(item2) {
                    _.forEach(group[2], function(item3) {
                        if (item1 === item2 && item1 === item3 && item2 === item3 && numberOfMatches === 0) {
                            numberOfMatches += 1;
                            commonItemTypes.push(item1);
                        }
                    });
                });
            });
        });
    });

    return commonItemTypes;
}

console.log('Part 1 - The sum of the priorities of the item types is: ' + returnSumOfItems(returnCommonItemTypesPart1()));
console.log('Part 2 - The sum of the priorities of the item types is: ' + returnSumOfItems(returnCommonItemTypesPart2()));