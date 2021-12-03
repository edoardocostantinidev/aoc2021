const fs = require('fs');
function main() {
    const binNums = getBinaryNumbersFromFile('input.txt');

    const gammaRate = convertByteArrayToInt(getGammaRate(binNums));
    const epsilonRate = convertByteArrayToInt(getEpsilonRate(binNums));
    const consumption = gammaRate * epsilonRate;
    console.log(consumption)
}

function getGammaRate(binaryNumbers) {
    let gammaRate = [];
    for (const binNums of binaryNumbers) {
        let gamma = 0;
        for (const num of binNums) {
            if (num === 1)
                gamma++;
            else gamma--;

        }

        gammaRate.push(gamma > 0 ? 1 : 0);
    }
    return gammaRate;
}

function getEpsilonRate(binaryNumbers) {
    let epsilonRate = [];
    for (const binNums of binaryNumbers) {
        let epsilon = 0;
        for (const num of binNums) {
            if (num === 1)
                epsilon++;
            else epsilon--;
        }
        epsilonRate.push(epsilon < 0 ? 1 : 0);
    }
    return epsilonRate;

}

// [[all first bits], [all second bits],... [all nth bits]] 
function getBinaryNumbersFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const lines = data.split('\n');
    const binNums = [];
    let bitLenght = lines[0].length
    for (let i = 0; i < bitLenght; i++) {
        let bitArray = [];
        for (let j = 0; j < lines.length; j++) {
            const element = parseInt(lines[j][i]);
            bitArray.push(element);
        }
        binNums.push(bitArray);
    }
    return binNums;
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