const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
let m = [];
for (const line of input.split('\n')) {
    let r = [];
    for (const c of line) {
        r.push(parseInt(c));
    }
    m.push(r);
}
let riskLevels = {};
for (let r = 0; r < m.length; r++) {
    const row = m[r];
    for (let c = 0; c < row.length; c++) {
        const square = row[c];
        const up = r > 0 ? m[r - 1][c] : Infinity;
        const down = r < m.length - 1 ? m[r + 1][c] : Infinity;
        const left = c > 0 ? row[c - 1] : Infinity;
        const right = c < row.length - 1 ? row[c + 1] : Infinity;
        const lowest = Math.min(up, down, left, right);
        if (square < lowest) {
            riskLevels[`${r},${c}`] = square + 1;
        }
    }
}
console.log(Object.values(riskLevels).reduce((a, b) => a + b));