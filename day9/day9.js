const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
//part1
const m = [];
const adjM = [];
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
        if (square < 9) {
            adjM[r] = adjM[r] || [];
            adjM[r][c] = 1;
        } else {
            adjM[r] = adjM[r] || [];
            adjM[r][c] = 0;
        }
    }
}
let visited = [];
for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[r].length; c++) {
        visited[r] = visited[r] || [];
        visited[r][c] = false;
    }
}
const basins = [];
let area = 0;
for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[r].length; c++) {
        if (adjM[r][c] === 1 && visited[r][c] === false) {
            const bfsValue = bfs(r, c, visited, adjM, area);
            basins.push(bfsValue.values);
            visited = bfsValue.visited;
            area++;
        }
        else {
            visited[r][c] = true;
        }
    }
}
console.log('PART 1:');
console.log(Object.values(riskLevels).reduce((a, b) => a + b));
console.log('PART 2:');
const basinsValues = basins.sort((a, b) => b.length - a.length).slice(0, 3).reduce((a, b) => a * b.length, 1);
console.log(basinsValues);



//bfs search on adjacency matrix
function bfs(r, c, visited, adjM, area) {
    const queue = [];
    const values = [];
    queue.push({ r, c, area });
    while (queue.length > 0) {
        const { r, c } = queue.shift();
        if (visited[r][c] === false) {
            visited[r][c] = true;
            if (adjM[r][c] === 1) {
                queue.push({ r, c, area });
                values.push({ r, c, area });
                if (r - 1 >= 0)
                    queue.push({ r: r - 1, c, area });
                if (r + 1 < adjM.length)
                    queue.push({ r: r + 1, c, area });
                if (c - 1 >= 0)
                    queue.push({ r, c: c - 1, area });
                if (c + 1 < adjM[r].length)
                    queue.push({ r, c: c + 1, area });
            }
        }
    }
    return { values, visited };
}
