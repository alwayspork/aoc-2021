fs = require('fs');

const file = fs.readFileSync('day-03/input.txt', 'utf8');
const input = file.split('\n');


// Part 1
const mapEachBitToArray = (arr) => {
  const bitLength = arr[0].split('').length;
  const mappedArrays = [...Array(bitLength)].map(x => []);
  for (let i=0; i<arr.length; i++) {
    bits = arr[i].split('');
    for (let j=0; j<bits.length; j++) {
      mappedArrays[j].push(bits[j]);
    }
  }
  return mappedArrays;
}

const sortBits = (arr) => arr.sort((a,b) => {
  // sort array from least to most common
  // if equally common, sort lowest to highest number
  if (arr.filter(v => v===a).length === arr.filter(v => v===b).length) {
    return parseInt(a) - parseInt(b);
  }
  return arr.filter(v => v===a).length - arr.filter(v => v===b).length;
});

const powerConsumption = (arr) => {
  const bitsArrays = mapEachBitToArray(arr);
  const gammaBinary = bitsArrays.map((eachBit) => sortBits(eachBit).pop()).join('');
  const epsilonBinary = bitsArrays.map((eachBit) => sortBits(eachBit).shift()).join('');

  return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2);
}

console.log(powerConsumption(input));


// Part 2
const filterHighestByIndex = (value, arrayToCompare, ind) => {
  // value should match most common / highest value of array, which is last
  return value.split('')[ind] === sortBits(arrayToCompare[ind])[arrayToCompare[ind].length - 1];
}

const filterLowestByIndex = (value, arrayToCompare, ind) => {
  // value should match least common / lowest value of array, which is first
  return value.split('')[ind] === sortBits(arrayToCompare[ind])[0];
}

const lifeSupportRating = (arr) => {
  let oxygen = arr;
  let co2scrubber = arr;
  let n = 0;
  let m = 0;

  while (oxygen.length > 1) {
    const highBitArrays = mapEachBitToArray(oxygen);
    oxygen = oxygen.filter((x) => filterHighestByIndex(x, highBitArrays, n));
    n++;
  }

  while (co2scrubber.length > 1) {
    const lowBitArrays = mapEachBitToArray(co2scrubber);
    co2scrubber = co2scrubber.filter((x) => filterLowestByIndex(x, lowBitArrays, m));
    m++;
  }

  return parseInt(oxygen, 2) * parseInt(co2scrubber, 2);
}

console.log(lifeSupportRating(input));