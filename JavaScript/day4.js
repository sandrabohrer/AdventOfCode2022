var fs = require('fs'),
    _ = require('lodash');


function returnSectionAssignments() {
    try {
        const data = fs.readFileSync('../data/day4.txt', 'utf8');
        var sectionAssignments = data.toString().split("\n").map(item => item.trim());

        return sectionAssignments;
    } catch (err) {
        console.error(err);
    }
}

function returnSplitSectionAssignments() {
    var sectionAssignments = returnSectionAssignments(),
        elfAssignment = [],
        newSectionAssignments = [];

    _.forEach(sectionAssignments, function(elfPair) {
        elfAssignment = elfPair.split(',');

        newSectionAssignments.push(elfAssignment);
    });

    return newSectionAssignments;
}

function returnFullSectionAssignmentOverlapCheck() {
    var sectionAssignments = returnSplitSectionAssignments()
        elfAssignment1 = [],
        elfAssignment2 = [],
        sectionAssignmentOverlapCount = 0,
        elf1Start = 0,
        elf1End = 0,
        elf2Start = 0,
        elf2End = 0,
        isFirstRangeInSecondRange = false,
        isSecondRangeInFirstRange = false;

    _.forEach(sectionAssignments, function(elfPair) {
        elf1Start = 0;
        elf1End = 0;
        elf2Start = 0;
        elf2End = 0;
        isFirstRangeInSecondRange = false;
        isSecondRangeInFirstRange = false;

        elfAssignment1 = elfPair[0].split('-');
        elfAssignment2 = elfPair[1].split('-');

        elfAssignment1 = elfAssignment1.map(Number);
        elfAssignment2 = elfAssignment2.map(Number);

        elf1Start = elfAssignment1[0];
        elf1End = elfAssignment1[1] + 1;
        elf2Start = elfAssignment2[0];
        elf2End = elfAssignment2[1] + 1;

        isFirstRangeInSecondRange = _.inRange(elfAssignment1[0], elf2Start, elf2End) && _.inRange(elfAssignment1[1], elf2Start, elf2End);
        isSecondRangeInFirstRange = _.inRange(elfAssignment2[0], elf1Start, elf1End) && _.inRange(elfAssignment2[1], elf1Start, elf1End);

        if (isFirstRangeInSecondRange || isSecondRangeInFirstRange) {
            sectionAssignmentOverlapCount += 1;
        }
    });

    return sectionAssignmentOverlapCount;
}

function returnPartialSectionAssignmentOverlapCheck() {
    var sectionAssignments = returnSplitSectionAssignments()
        elfAssignment1 = [],
        elfAssignment2 = [],
        sectionAssignmentOverlapCount = 0,
        elf1Start = 0,
        elf1End = 0,
        elf2Start = 0,
        elf2End = 0,
        isFirstRangeInSecondRange = false,
        isSecondRangeInFirstRange = false;

    _.forEach(sectionAssignments, function(elfPair) {
        elf1Start = 0;
        elf1End = 0;
        elf2Start = 0;
        elf2End = 0;
        isFirstRangeInSecondRange = false;
        isSecondRangeInFirstRange = false;

        elfAssignment1 = elfPair[0].split('-');
        elfAssignment2 = elfPair[1].split('-');

        elfAssignment1 = elfAssignment1.map(Number);
        elfAssignment2 = elfAssignment2.map(Number);

        elf1Start = elfAssignment1[0];
        elf1End = elfAssignment1[1] + 1;
        elf2Start = elfAssignment2[0];
        elf2End = elfAssignment2[1] + 1;

        isFirstRangeInSecondRange = _.inRange(elfAssignment1[0], elf2Start, elf2End) || _.inRange(elfAssignment1[1], elf2Start, elf2End);
        isSecondRangeInFirstRange = _.inRange(elfAssignment2[0], elf1Start, elf1End) || _.inRange(elfAssignment2[1], elf1Start, elf1End);

        if (isFirstRangeInSecondRange || isSecondRangeInFirstRange) {
            sectionAssignmentOverlapCount += 1;
        }
    });

    return sectionAssignmentOverlapCount;
}

console.log('The number of assignment pairs where one range fully contains the other is: ' + returnFullSectionAssignmentOverlapCheck());
console.log('The number of assignment pairs where the ranges overlap is: ' + returnPartialSectionAssignmentOverlapCheck());