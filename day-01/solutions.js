fs = require('fs');

const file = fs.readFileSync('day-01/input.txt', 'utf8');
const input = file.split('\n').map((i) => Number(i));


// Part 1
const countIncreases = (arr) => {
  let totalIncreases = 0;
  for (let i=1; i<arr.length; i++) {
    if (arr[i] > arr[i-1]) {
      totalIncreases++;
    }
  }
  return totalIncreases;
}

console.log(countIncreases(input));


// Part 2
const reducer = (prevValue, currValue) => prevValue + currValue;

const sliceWindows = (arr, size) => {
  if (size > arr.length) {
    return arr;
  }
  let result = [];
  let lastWindow = arr.length - size;
  for (let i=0; i<=lastWindow; i++) {
    const window = arr.slice(i, i + size);
    result.push(window.reduce(reducer));
  }
  return result;
}

const countWindowIncreases = (arr) => {
  let totalIncreases = 0;
  const windowTotals = sliceWindows(arr, 3);
  for (let i=1; i<windowTotals.length; i++) {
    if (windowTotals[i] > windowTotals[i-1]) {
      totalIncreases++;
    }
  }
  return totalIncreases;
}

console.log(countWindowIncreases(input));