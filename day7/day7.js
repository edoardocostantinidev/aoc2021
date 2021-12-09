const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');


let crabs = [];
let fuelConsumptionTable = [];
input
    .split(',')
    .forEach(c => {

        crabs.push(parseInt(c));
    });
let max = crabs.reduce((a, b) => a < b ? b : a);
for (let n = 0; n < max; n++) {
    if (n == 0) {
        fuelConsumptionTable[0] = 0;
    }
    else if (n == 1) {
        fuelConsumptionTable[1] = 1;
    }
    else {
        let total = n;
        for (let m = n - 1; m > 0; m--) {
            total += m;
        }
        fuelConsumptionTable[n] = total;
    }
}
let minFuel = Infinity;
let targets = [];
for (let i = 0; i <= max; i++) {
    targets.push(i);
}
for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    let totalFuel = 0;
    for (let j = 0; j < crabs.length; j++) {
        const crab = crabs[j];
        const steps = Math.abs(target - crab)
        totalFuel += fuelConsumptionTable[steps];
    }
    if (minFuel > totalFuel) {
        minFuel = totalFuel;
        console.log(`${target} = ${totalFuel}`);
    }
}
console.log(minFuel)


// 1 to 2 = 1
// 1 to 3 = 3
// 1 to 4 = 6
// 1 to 5 = 10
// 1 to 6 = 15
// 1 to 7 = 21
// 1 to 15 = 105
