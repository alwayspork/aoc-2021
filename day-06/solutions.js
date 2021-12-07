fs = require('fs');

const file = fs.readFileSync('day-06/input.txt', 'utf8');
const input = file.split(',').map(x => parseInt(x));


// Part 1
countLanterfish = (lanternfish, numberOfDays) => {
	let fish = lanternfish;

	for (let i=0; i<numberOfDays; i++) {
		const newFish = [];
		const existingFish = fish.map(days => {
			if (days === 0) {
				newFish.push(8);
				return 6;
			} else {
				return days - 1;
			}
		});
		fish = [...existingFish, ...newFish];
	}

	return fish.length;
}

console.log(countLanterfish(input, 80));


// Part 2
countManyLanterfish = (lanternfish, numberOfDays) => {
	const countPerDaysRemaining = Array(9).fill(0);
	lanternfish.forEach(fish => countPerDaysRemaining[fish]++);

	for (let i=0; i<numberOfDays; i++) {
		const fishMakingNewFish = countPerDaysRemaining.shift();

		countPerDaysRemaining[6] += fishMakingNewFish;
		countPerDaysRemaining.push(fishMakingNewFish);
	}

	return countPerDaysRemaining.reduce((accum, currentValue) => accum + currentValue);
}

console.log(countManyLanterfish(input, 256));