const fs = require('fs');
let input = fs.readFileSync('test.txt', 'utf8');
input = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
let count = 0;
for (const line of input.split('\n')) {
    const splitted = line.split('\|');
    const digitsLine = splitted[1].trim();
    const uniqueSignalPatterns = splitted[0].trim().split(' ');
    const digits = digitsLine.split(' ');
    const mappings = getMappings(uniqueSignalPatterns);
    count += getNumber(mappings, digits);
}
console.log(count);

function getMappings(patterns) {
    const mappings = {};
    const originalPairs = [
        'abcefg',
        'cf',
        'acdeg',
        'acdfg',
        'bcdf',
        'abdg',
        'abdefg',
        'acf',
        'abcdefg',
        'abcdfg'
    ];
    const newPairs = originalPairs.map((_) => '.');
    for (const pattern of patterns) {
        const length = pattern.length;
        const sortedPattern = sortString(pattern);
        switch (length) {
            case 2:
                newPairs[1] = sortedPattern;
                break;
            case 3:
                newPairs[7] = sortedPattern;
                break;
            case 4:
                newPairs[4] = sortedPattern;
                break;
            case 7:
                newPairs[8] = sortedPattern;
                break;
            default:
                break;
        }
    }
    const one = newPairs[1];
    const four = newPairs[4];
    const seven = newPairs[7];

    for (const pattern of patterns) {
        const length = pattern.length;
        const sortedPattern = sortString(pattern);
        switch (length) {
            case 6:
                if (isCorrect(sortedPattern, four)) {
                    newPairs[0] = sortedPattern;
                } else if (isCorrect(sortedPattern, seven)) {
                    newPairs[6] = sortedPattern;
                } else {
                    newPairs[9] = sortedPattern;
                }

            default:
                break;
        }
    }

    for (const pattern of patterns) {
        const length = pattern.length;
        const sortedPattern = sortString(pattern);
        switch (length) {
            case 5:
                if (isCorrect(sortedPattern, one)) {
                    newPairs[5] = sortedPattern;
                } else if (isCorrect(sortedPattern, four)) {
                    newPairs[3] = sortedPattern;
                } else {
                    newPairs[2] = sortedPattern;
                }

            default:
                break;
        }
    }

    for (let i = 0; i < newPairs.length; i++) {
        mappings[newPairs[i]] = i;
    }
    return mappings;
}


function isCorrect(sortedPattern, numbersArray) {
    //check if all elements of numbersArrays are all a subset of sortedPattern
    for (const number of numbersArray) {
        if (!sortedPattern.includes(number)) {
            return false;
        }
    }
    return true;
}

function getNumber(mappings, digits) {
    let exponent = 0;
    let count = 0;
    for (let i = digits.length - 1; i > 0; i--) {
        const string = sortString(digits[i]);
        const element = mappings[string];
        if (element === undefined) {
            continue;
        }
        count += element * Math.pow(10, exponent);
        exponent++;
    }
    return count;
}

function sortString(str) {
    return str.split('').sort().join('');
}
