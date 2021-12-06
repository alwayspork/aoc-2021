fs = require('fs');

const file = fs.readFileSync('day-04/input.txt', 'utf8');
const input = file.split('\n\n');
const numbers = input.shift().split(',');
const boards = input.map(x => {
	const eachBoard = x.split('\n');
	return eachBoard.map(y => y.trim().replace(/  /g, ' ').split(' '));
});


// Part 1
const isWinningLine = (line, calledNumbers) => {
  const missingIndex = line.findIndex(val => !calledNumbers.includes(val));
  return line.length > 0 && missingIndex === -1;
}

const transposeAndCombine = (board) => {
	const boardTransposed = board[0].map((_, i) => board.map(x => x[i]));
	return [...board, ...boardTransposed];
}

const checkForBingo = (numbers, boards) => {
	const calledNumbers = [];

	for (let i=0; i<numbers.length; i++) {
		calledNumbers.push(numbers[i]);

		for (let j=0; j<boards.length; j++) {
			const board = boards[j];
	  	const boardBothWays = transposeAndCombine(board);

			// loop through each row and column on the board
			for (let k=0; k<boardBothWays.length; k++) {
				if (isWinningLine(boardBothWays[k], calledNumbers)) {
					const winner = [].concat(...board);
					const unmatchedNumbers = winner.filter(x => !calledNumbers.includes(x));
					const unmatchedSum = unmatchedNumbers.map(x => parseInt(x)).reduce((a, b) => a + b);

					return unmatchedSum * numbers[i];
				}
			}
		}
	}
}

console.log(checkForBingo(numbers, boards));


// Part 2
const checkForLastBingo = (numbers, boards) => {
	const calledNumbers = [];
	const remainingBoards = boards;

	for (let i=0; i<numbers.length; i++) {
		calledNumbers.push(numbers[i]);

		for (let j=0; j<remainingBoards.length; j++) {
			const board = remainingBoards[j];
	  	const boardBothWays = transposeAndCombine(board);

			// loop through each row and column on the board
			for (let k=0; k<boardBothWays.length; k++) {
				if (isWinningLine(boardBothWays[k], calledNumbers)) {
					const currIndex = remainingBoards.indexOf(board);

					if (remainingBoards.length > 1 && currIndex > -1) {
						remainingBoards.splice(currIndex, 1); // remove the winner
					} else if (currIndex > -1) {
						const loser = [].concat(...board);
						const unmatchedNumbers = loser.filter(x => !calledNumbers.includes(x));
						const unmatchedSum = unmatchedNumbers.map(x => parseInt(x)).reduce((a, b) => a + b);

						return unmatchedSum * numbers[i];
					}
				}
			}
		}
	}
}

console.log(checkForLastBingo(numbers, boards));