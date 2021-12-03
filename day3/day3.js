const fs = require('fs');
function main() {
    const bitArrays = getBinaryArraysFromFile('input.txt');
    const transposedBitArrays = bitArrays[0].map((_, colIndex) => bitArrays.map(row => row[colIndex]));
    const mostCommonBits = getMostCommonBits(bitArrays);
    const leastCommonBits = getLeastCommonBits(bitArrays);

    const gammaRate = convertByteArrayToInt(mostCommonBits);
    const epsilonRate = convertByteArrayToInt(leastCommonBits);
    console.log(`most common bits: ${mostCommonBits}`);
    console.log(`least common bits: ${leastCommonBits}`);

    const oxygenGeneratorRatingArray = filterByBitCriteria(0, transposedBitArrays, true);
    const co2ScrubberRatingArray = filterByBitCriteria(0, transposedBitArrays, false);
    const oxygenGeneratorRating = convertByteArrayToInt(oxygenGeneratorRatingArray);
    const co2ScrubberRating = convertByteArrayToInt(co2ScrubberRatingArray);
    const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
    const consumption = gammaRate * epsilonRate;
    console.log(`Gamma rate: ${gammaRate}`);
    console.log(`Epsilon rate: ${epsilonRate}`);
    console.log(`Consumption: ${consumption}`);
    console.log(`O2 Generator Rating: ${oxygenGeneratorRating}`);
    console.log(`Co2 Scrubber Rating: ${co2ScrubberRating}`);
    console.log(`Life support rating: ${lifeSupportRating}`);
}
function filterByBitCriteria(index, bitArrays, most) {

    if (bitArrays.length === 1) {
        return bitArrays[0];

    }
    let newBitArrays = [];
    const t = bitArrays[0].map((_, c) => bitArrays.map(r => r[c]));
    const commonBits = most ? getMostCommonBits(t) : getLeastCommonBits(t);

    const commonBit = commonBits[index];

    for (let i = 0; i < bitArrays.length; i++) {
        if (bitArrays[i][index] === commonBit)
            newBitArrays.push(bitArrays[i]);
    }


    return filterByBitCriteria(++index, newBitArrays, most);
}

function getMostCommonBits(binaryNumbers) {
    let gammaRate = [];
    for (const binNums of binaryNumbers) {
        let gamma = 0;
        for (const num of binNums) {
            if (num === 1)
                gamma++;
            else gamma--;

        }
        if (gamma === 0)
            gammaRate.push(1);
        else
            gammaRate.push(gamma > 0 ? 1 : 0);
    }
    return gammaRate;
}

function getLeastCommonBits(binaryNumbers) {
    let epsilonRate = [];
    for (const binNums of binaryNumbers) {
        let epsilon = 0;
        for (const num of binNums) {
            if (num === 1)
                epsilon++;
            else epsilon--;
        }
        if (epsilon === 0)
            epsilonRate.push(0);
        else
            epsilonRate.push(epsilon < 0 ? 1 : 0);
    }
    return epsilonRate;

}

// [[all first bits], [all second bits],... [all nth bits]] 
function getBinaryArraysFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const lines = data.split('\n');
    const bitArrays = [];
    let bitLenght = lines[0].length
    for (let i = 0; i < bitLenght; i++) {
        let bitArray = [];
        for (let j = 0; j < lines.length; j++) {
            const element = parseInt(lines[j][i]);
            bitArray.push(element);
        }
        bitArrays.push(bitArray);
    }
    return bitArrays;
}

// convert byte array to int 
function convertByteArrayToInt(byteArray) {
    let result = 0;
    for (let i = 0; i < byteArray.length; i++) {
        result = result * 2 + byteArray[i];
    }
    return result;
}

main();