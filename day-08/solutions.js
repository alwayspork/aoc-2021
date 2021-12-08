fs = require('fs');

const file = fs.readFileSync('day-08/input.txt', 'utf8');
const input = file.split('\n').map(entry => {
  const entryArray = entry.split(' ');
  const delimeter = entryArray.indexOf('|');
  return [entryArray.slice(0, delimeter), entryArray.slice(delimeter + 1)];
});

// 0 : 6 segments
// 1 : 2 segments
// 2 : 5 segments
// 3 : 5 segments
// 4 : 4 segments
// 5 : 5 segments
// 6 : 6 segments
// 7 : 3 segments
// 8 : 7 segments
// 9 : 6 segments


// Part 1
const countDigits = (entries) => {
  return entries.reduce((accumulator, entry) => {
    const output = entry[1];
    const uniqueSegmentCounts = [2, 4, 3, 7];

    const uniqueValues = output.filter((signal) => uniqueSegmentCounts.includes(signal.length));
    return accumulator += uniqueValues.length;
  }, 0);
}

console.log(countDigits(input));


// Part 2
const getSix = (patterns) => {
  // six segment numbers are 0, 6, 9
  // 1 has segments on upper right, and lower right
  // 0 and 9 also have these, but 6 is missing upper right
  const seven = patterns.filter(pattern => pattern.length === 3)[0];
  const sixSegments = patterns.filter(pattern => pattern.length === 6);

  return sixSegments.filter(pattern => {
    const missingUpperRightSegment = seven.split('').filter(x => !pattern.split('').includes(x));
    return missingUpperRightSegment.length > 0;
  })[0];
}

const getRightSegments = (six, patterns) => {
  const one = patterns.filter(pattern => pattern.length === 2)[0];
  const eight = patterns.filter(pattern => pattern.length === 7)[0];

  const upperRight = eight.split('').filter(x => !six.split('').includes(x))[0];
  const lowerRight = one.split('').filter(x => x !== upperRight)[0];

  return {upperRight, lowerRight};
}

const doesMatch = (a, b) => a.split('').sort().join('') === b.split('').sort().join('');

const decode = (entries) => {
  const decoded = entries.map(entry => {
    const [patterns, output] = entry;

    const six = getSix(patterns);

    const decodedOutput = output.map(signal => {
      switch (signal.length) {
        case 2:
          return 1;
        case 4:
          return 4;
        case 3:
          return 7;
        case 7:
          return 8;
        case 6:
          // 0, 6, 9
          if (doesMatch(six, signal)) {
            return 6;
          }
          const four = patterns.filter(pattern => pattern.length === 4)[0];
          const hasMiddleBar = four.split('').filter(x => !signal.split('').includes(x)).length === 0;
          if (hasMiddleBar) {
            return 9;
          }
          return 0;
        case 5:
          // 2, 3, 5
          const {upperRight, lowerRight} = getRightSegments(six, patterns);
          if (!signal.split('').includes(upperRight)) {
            return 5;
          }
          if (!signal.split('').includes(lowerRight)) {
            return 2;
          }
          return 3;
        default:
          return;
      }
    });

    return Number(decodedOutput.join(''));
  });

  return decoded.reduce((a,b) => a + b);
}

console.log(decode(input));
