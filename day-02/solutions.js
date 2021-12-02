fs = require('fs');

const file = fs.readFileSync('day-02/input.txt', 'utf8');
const input = file.split('\n');


// Part 1
const getPosition = (arr) => {
    let horizontal = 0;
    let depth = 0;
    for (let i=0; i<arr.length; i++) {
        const [direction, num] = arr[i].split(' ');
        const amount = parseInt(num);

        if (direction === 'forward') {
            horizontal += amount;
        } else if (direction === 'up') {
            depth -= amount;
        } else if (direction === 'down') {
           depth += amount;
        }
    }

    return horizontal * depth;
}

console.log(getPosition(input));


// Part 2
const getPositionWithAim = (arr) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i=0; i<arr.length; i++) {
        const [direction, num] = arr[i].split(' ');
        const amount = parseInt(num);

        if (direction === 'forward') {
            horizontal += amount;
            depth += (aim * amount);
        } else if (direction === 'up') {
            aim -= amount;
        } else if (direction === 'down') {
            aim += amount;
        }
    }

    return horizontal * depth;
}

console.log(getPositionWithAim(input));