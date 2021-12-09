const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
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
    for (let i = 0; i < patterns.length; i++) {
        const pattern = sortString(patterns[i]);
        const length = pattern.length;
        switch (length) {
            case 2:
                newPairs[1] = pattern;
                break;
            case 3:
                newPairs[7] = pattern;
                break;
            case 4:
                newPairs[4] = pattern;
                break;
            case 7:
                newPairs[8] = pattern;
                break;
            default:
                break;
        }
    }

    for (let i = 0; i < patterns.length; i++) {
        const pattern = sortString(patterns[i]);
        const length = pattern.length;
        switch (length) {
            case 5:
                if (intersections(pattern, newPairs[7]) === 3) {
                    newPairs[3] = pattern;
                    break;
                }
                else if (intersections(pattern, newPairs[4]) === 3) {
                    newPairs[5] = pattern;
                    break;
                }
                else {
                    newPairs[2] = pattern;
                    break;
                }
            case 6:
                if (intersections(pattern, newPairs[4]) === 4) {
                    newPairs[9] = pattern;
                    break;
                }
                else if (intersections(pattern, newPairs[7]) === 3) {
                    newPairs[0] = pattern;
                    break;
                }
                else {
                    newPairs[6] = pattern;
                    break;
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

function intersections(str1, str2) {
    let count = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str2.includes(str1[i])) {
            count++;
        }
    }
    return count;
}


function getNumber(mappings, digits) {
    let exponent = 0;
    let count = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
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
