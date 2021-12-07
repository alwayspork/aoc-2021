fs = require('fs');

const file = fs.readFileSync('day-05/input.txt', 'utf8');
const input = file.split('\n');
const lines = input.map(line => {
	return eachLine = line.split(' -> ').map(coord => coord.split(',').map(x => parseInt(x)));
});


const getDimensions = (lines) => {
	const xDataset = [],
				yDataset = [];

	lines.map((line) => {
		const [[x1, y1], [x2, y2]] = line;
		xDataset.push(x1, x2);
		yDataset.push(y1, y2);
	});

	return [Math.max(...xDataset), Math.max(...yDataset)];
}

const getRange = (a, b) => {
	const start = Math.min(a, b);
	const stop = Math.max(a, b);
	// add 1 to range since endpoint should be included
	return Array.from({length: stop - start + 1}, (_, i) => start + i);
}

const findOverlap = (lines) => {
	const [width, height] = getDimensions(lines);
	const diagram = [...Array(height + 1)].map(x => [...Array(width + 1)].map(y => 0));

	lines.map((line) => {
		const [[x1, y1], [x2, y2]] = line;

		if (x1 === x2) {
			// horizontal line
			const range = getRange(y1, y2);
			range.map(a => diagram[a][x1] += 1);
		} else if (y1 === y2) {
			// vertical line
			const range = getRange(x1, x2);
			range.map(a => diagram[y1][a] += 1);
		}
	});

	const intersections = [].concat(...diagram).filter(x => x > 1);
	return intersections.length;
}

console.log(findOverlap(lines));


//Part 2
const findOverlapWithDiagonal = (lines) => {
	const [width, height] = getDimensions(lines);
	const diagram = [...Array(height + 1)].map(x => [...Array(width + 1)].map(y => 0));

	lines.map((line) => {
		const [[x1, y1], [x2, y2]] = line;

		if (x1 === x2) {
			// horizontal line
			const range = getRange(y1, y2);
			range.map(a => diagram[a][x1] += 1);
		} else if (y1 === y2) {
			// vertical line
			const range = getRange(x1, x2);
			range.map(a => diagram[y1][a] += 1);
		} else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
			// diagonal line
			const xRange = getRange(x1, x2);
			const yRange = getRange(y1, y2);
			if (x1 > x2) {
				xRange.reverse();
			}
			if (y1 > y2) {
				yRange.reverse();
			}

			xRange.map((x, i) => {
				const rowIndex = yRange[i];
				return diagram[rowIndex][x] += 1;
			});
		}
	});

	const intersections = [].concat(...diagram).filter(x => x > 1);
	return intersections.length;
}

console.log(findOverlapWithDiagonal(lines));