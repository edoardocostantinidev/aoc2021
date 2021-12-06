const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');


let fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

input
    .split(',')
    .forEach(f => {

        fishes[parseInt(f)]++;
    });
const days = 256;
let count = 0;
for (let d = 0; d < days; d++) {
    fishes = advance(fishes);
    count = fishes.reduce((a, b) => a + b, 0);
}
console.log(count);

function advance(fishes) {
    let zero = fishes.shift();
    let one = fishes.shift();
    let two = fishes.shift();
    let three = fishes.shift();
    let four = fishes.shift();
    let five = fishes.shift();
    let six = fishes.shift();
    let seven = fishes.shift();
    let eight = fishes.shift();

    fishes.push(one);
    fishes.push(two);
    fishes.push(three);
    fishes.push(four);
    fishes.push(five);
    fishes.push(six);
    fishes.push(seven + zero);
    fishes.push(eight);
    fishes.push(zero);
    return fishes;
}