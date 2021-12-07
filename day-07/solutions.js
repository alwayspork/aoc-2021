fs = require('fs');

const file = fs.readFileSync('day-07/input.txt', 'utf8');
const input = file.split(',').map(x => parseInt(x));


// Part 1
const sum = (arr) => arr.reduce((a, b) => a + b);

const getFuelAmount = (positions) => {
	const movementOptions = positions.map(x => {
		const fromThisPoint = positions.map(y => Math.abs(x - y));
		return sum(fromThisPoint);
	});

	return movementOptions.sort((a, b) => a - b).shift();
}

console.log(getFuelAmount(input));


// Part 2
const getSecondFuelAmount = (positions) => {
	const average = parseInt(sum(positions) / positions.length);
	const movement = positions.map(x => {
		const distance = Math.abs(average - x);
		// triangular number, so sum an array based on index
		const distanceArray = Array.from({length: distance}, (v, k) => k+1);
		return sum(distanceArray);
	});

	return sum(movement);
}

console.log(getSecondFuelAmount(input));
