fs = require('fs');

const file = fs.readFileSync('day-09/input.txt', 'utf8');
const map = file.split('\n').map(entry => entry.split('').map(x => parseInt(x)));


// Part 1
const findLowPoints = (map) => {
  const lowPointsSum = map.reduce((accumulator, row, i) => {
    row.forEach((location, j) => {
      const up = map[i-1]?.[j];
      const down = map[i+1]?.[j];
      const left = row[j-1];
      const right = row[j+1];
      const adjacent = [up, down, left, right].sort((a,b) => a - b);

      return location < adjacent[0] ? accumulator += (location + 1) : accumulator;
    });

    return accumulator;
  }, 0);

  return lowPointsSum;
}

console.log(findLowPoints(map));
