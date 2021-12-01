const fs = require('fs');


const numbers = getNumbersFromFile('./input.txt');
let largerMeasurements = 0;
let previousMeasurement = -1;
let count = 0;
for (const number of numbers) {

    if (count === 0) {
        count++;
        previousMeasurement = number;
        continue;
    }
    console.log(`comparing ${number} to ${previousMeasurement}`);
    if (number > previousMeasurement) {
        largerMeasurements++;
        console.log(largerMeasurements)
    }
    previousMeasurement = number;
}
console.log(largerMeasurements);

// read the file and parse the data, each line is a number
function getNumbersFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const lines = data.split('\n');
    const numbers = [];
    for (const line of lines) {
        const number = parseInt(line);
        if (number == NaN)
            continue;
        numbers.push(number);
    }
    return numbers;
}