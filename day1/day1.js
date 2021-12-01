const fs = require('fs');


const numbers = getNumbersFromFile('./input.txt');
let increasingMeasurementCount = 0;
let previousMeasurement = -1;
let increasingMeasurementWindowCount = 0;
let previousMeasurementWindow = -1;
let count = 0;
for (const number of numbers) {

    if (count === 0) {
        count++;
        previousMeasurement = number;
        continue;
    }

    if (number > previousMeasurement) {
        increasingMeasurementCount++;
    }
    previousMeasurement = number;
}

for (let index = 0; index < numbers.length - 2; index++) {
    let x, y, z;
    x = numbers[index];
    y = numbers[index + 1];
    z = numbers[index + 2];
    const currentMeasurementWindow = x + y + z;


    if (index !== 0 && currentMeasurementWindow > previousMeasurementWindow) {
        increasingMeasurementWindowCount++;
    }
    previousMeasurementWindow = currentMeasurementWindow;

}
console.log(`Larger Measurement: ${increasingMeasurementCount}`);
console.log(`Larger Measurement (Windows): ${increasingMeasurementWindowCount}`);


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