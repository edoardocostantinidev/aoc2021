const { count } = require('console');
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const x1s = [];
const x2s = [];
const y1s = [];
const y2s = [];

for (const line of input.split('\n')) {
    const regex = /(\d{1,3})/gm;
    const matches = line.match(regex);
    x1s.push(parseInt(matches[0]));
    y1s.push(parseInt(matches[1]));
    x2s.push(parseInt(matches[2]));
    y2s.push(parseInt(matches[3]));
}

const maxX = Math.max(...x1s, ...x2s) + 1;
const maxY = Math.max(...y1s, ...y2s) + 1;
console.log(maxX, maxY);
const matrix = [];

for (let x = 0; x < maxX; x++) {
    let row = [];
    for (let y = 0; y < maxY; y++) {
        row.push(0);
    }
    matrix.push(row);
}

for (let i = 0; i < x1s.length; i++) {
    const x1 = x1s[i];
    const y1 = y1s[i];
    const x2 = x2s[i];
    const y2 = y2s[i];
    console.log(x1, y1, x2, y2);
    if (y1 == y2) {
        const difference = x2 - x1;
        if (difference > 0) {
            //go to right
            for (let x = difference; x >= 0; x--) {
                matrix[y1][x1 + x] += 1;
            }
        } else if (difference < 0) {
            //go to left
            for (let x = difference; x <= 0; x++) {
                matrix[y1][x1 + x] += 1;
            }

        }
    }
    else if (x1 == x2) {
        const difference = y2 - y1;
        if (difference > 0) {
            //go down
            for (let y = difference; y >= 0; y--) {
                matrix[y1 + y][x1] += 1;
            }
        } else if (difference < 0) {
            //go up
            for (let y = difference; y <= 0; y++) {
                matrix[y1 + y][x1] += 1;
            }
        }
    }
    else {
        const dX = x2 - x1;
        const dY = y2 - y1;
        const dXAbs = Math.abs(dX);
        const dYAbs = Math.abs(dY);
        if (dXAbs == dYAbs) {
            //diagonal
            if (dX > 0 && dY > 0) {
                //down right
                for (let x = 0; x <= dXAbs; x++) {
                    matrix[y1 + x][x1 + x] += 1;
                }
            }
            else if (dX > 0 && dY < 0) {
                //up right
                for (let x = 0; x <= dXAbs; x++) {
                    matrix[y1 - x][x1 + x] += 1;
                }
            }
            else if (dX < 0 && dY > 0) {
                //down left
                for (let x = 0; x <= dXAbs; x++) {
                    matrix[y1 + x][x1 - x] += 1;
                }
            }
            else if (dX < 0 && dY < 0) {
                //up left
                for (let x = 0; x <= dXAbs; x++) {
                    matrix[y1 - x][x1 - x] += 1;
                }
            }
        }
    }

}
function countMatrix(matrix) {
    let count = 0;
    for (let r = 0; r < matrix.length; r++) {
        const row = matrix[r];
        //console.log(...row);
        count += row.filter((a) => a >= 2).length;
    }
    return count;
}
console.log(countMatrix(matrix));