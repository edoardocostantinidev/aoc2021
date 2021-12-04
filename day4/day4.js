const fs = require('fs')
const chunk = require('lodash/chunk')

const regex = /(\d{1,2})/gm;
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');

const extractedNumbers = lines[0].split(',');
const boardsRaw = chunk(
    lines.slice(1)
        .filter((l) => l != ''), 5);
let boards = [];
for (const boardRaw of boardsRaw) {
    let board = [];
    for (const line of boardRaw) {
        const lineNumbers = line.match(regex);
        const lineNumbersInt = lineNumbers.map((n) => parseInt(n));
        board.push(lineNumbersInt);
    }
    boards.push(board);
}
let markedBoards = boards.map((b) => b.map((s) => s.map((s) => 0)));
let winners = play(extractedNumbers, boards, markedBoards);
const winner = winners[0];
const squid = winners.at(-1);
console.log(winner.score);
console.log(squid.score);

function calculateScore(board, markedBoard, num) {
    let score = 0;
    for (let i = 0; i < markedBoard.length; i++) {
        const line = markedBoard[i];
        for (let j = 0; j < line.length; j++) {
            const square = line[j];
            if (square == 0) {
                score += board[i][j];
            }
        }
    }
    return score * num;
}

function play(extractedNumbers, boards, markedBoards) {
    let winners = [];
    for (const num of extractedNumbers) {
        console.log(`Extracting: ${num}`)

        let indices = winners.map((w) => w.boardIndex);

        for (let i = 0; i < boards.length; i++) {
            if (indices.includes(i))
                continue;
            const board = boards[i];
            for (let j = 0; j < board.length; j++) {
                const line = board[j];
                for (let k = 0; k < line.length; k++) {
                    const square = line[k];
                    if (square == num) {
                        markedBoards[i][j][k] = 1;
                    }
                }
            }
        }
        for (let i = 0; i < markedBoards.length; i++) {
            if (indices.includes(i))
                continue;
            const markedBoard = markedBoards[i];
            const transposeMarkedBoard = markedBoard[0].map((_, i) => markedBoard.map((row) => row[i]));
            for (let j = 0; j < markedBoard.length; j++) {
                const wins = markedBoard[j].every((s) => s == 1);
                if (wins) {
                    console.log(`Board ${i} wins`);
                    winners.push({
                        boardIndex: i, board: boards[i], markedBoard: markedBoards[i], score: calculateScore(boards[i], markedBoards[i], num)
                    });
                    continue;
                }
            }
            for (let j = 0; j < transposeMarkedBoard.length; j++) {
                const wins = transposeMarkedBoard[j].every((s) => s == 1);
                if (wins) {
                    console.log(`Board ${i} wins`);
                    winners.push({ boardIndex: i, board: boards[i], markedBoard: markedBoards[i], score: calculateScore(boards[i], markedBoards[i], num) });
                    continue;
                }
            }

        }

    }
    return winners;
}