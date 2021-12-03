const fs = require('fs');
function main() {
    let state = { "horizontal": 0, "depth": 0, "aim": 0 };
    const commands = getCommandsFromFile('input.txt');
    for (const command of commands) {
        console.log(state);

        switch (command.command) {
            case "forward":
                state.horizontal += command.num;
                state.depth += (state.aim * command.num);
                break;
            case "up":
                state.aim -= command.num;
                break;
            case "down":
                state.aim += command.num;
                break;
            default:
                break;
        }
    }
    console.log(state);
    console.log(state.horizontal * state.depth);
}

function getCommandsFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const lines = data.split('\n');
    const commands = [];
    for (const line of lines) {
        const words = line.split(' ');
        const command = words[0];
        const num = parseInt(words[1]);
        if (num == NaN)
            continue;
        commands.push({ command, num });
    }
    return commands;
}

main();