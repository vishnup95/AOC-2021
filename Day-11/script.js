import * as fs from 'fs/promises';

let input = await fs.readFile('./input.txt', 'utf-8');
// let input = `11111
// 19991
// 19191
// 19991
// 11111`;

input = input.split('\n').map((e) => e.split('').map(Number));

// look at generator for neighbour data
function getNeighbours(depthData, i, j) {
	let adjacentPoints = [];
	if (i === 0 && j === 0) {
		adjacentPoints.push({
			number: depthData[i][j + 1],
			i,
			j: j + 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j],
			i: i + 1,
			j,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j + 1],
			i: i + 1,
			j: j + 1,
		});
	} else if (i === 0 && j === depthData[0].length - 1) {
		adjacentPoints.push({
			number: depthData[i + 1][j],
			i: i + 1,
			j,
		});
		adjacentPoints.push({
			number: depthData[i][j - 1],
			i,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j - 1],
			i: i + 1,
			j: j - 1,
		});
	} else if (i === depthData.length - 1 && j === 0) {
		adjacentPoints.push({
			number: depthData[i - 1][j],
			i: i - 1,
			j: j,
		});
		adjacentPoints.push({
			number: depthData[i][j + 1],
			i,
			j: j + 1,
		});
		adjacentPoints.push({
			number: depthData[i - 1][j + 1],
			i: i - 1,
			j: j + 1,
		});
	} else if (i === depthData.length - 1 && j === depthData[0].length - 1) {
		adjacentPoints.push({
			number: depthData[i - 1][j],
			i: i - 1,
			j: j,
		});
		adjacentPoints.push({
			number: depthData[i][j - 1],
			i,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i - 1][j - 1],
			i: i - 1,
			j: j - 1,
		});
	} else if (i === 0) {
		adjacentPoints.push({ number: depthData[i][j - 1], i: i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i: i, j: j + 1 });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({
			number: depthData[i + 1][j - 1],
			i: i + 1,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j + 1],
			i: i + 1,
			j: j + 1,
		});
	} else if (j === 0) {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j + 1], i, j: j + 1 });
		adjacentPoints.push({
			number: depthData[i - 1][j + 1],
			i: i - 1,
			j: j + 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j + 1],
			i: i + 1,
			j: j + 1,
		});
	} else if (i === depthData.length - 1) {
		adjacentPoints.push({ number: depthData[i][j - 1], i: i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i: i, j: j + 1 });
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({
			number: depthData[i - 1][j - 1],
			i: i - 1,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i - 1][j + 1],
			i: i - 1,
			j: j + 1,
		});
	} else if (j === depthData[0].length - 1) {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j - 1], i, j: j - 1 });
		adjacentPoints.push({
			number: depthData[i + 1][j - 1],
			i: i + 1,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i - 1][j - 1],
			i: i - 1,
			j: j - 1,
		});
	} else {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j - 1], i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i, j: j + 1 });
		//
		adjacentPoints.push({
			number: depthData[i - 1][j - 1],
			i: i - 1,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i - 1][j + 1],
			i: i - 1,
			j: j + 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j - 1],
			i: i + 1,
			j: j - 1,
		});
		adjacentPoints.push({
			number: depthData[i + 1][j + 1],
			i: i + 1,
			j: j + 1,
		});
	}
	return {
		adjacentPoints,
	};
}

let glowedPoints = [];
let countOfGlows = 0;
function lookUpNeighboursAndGlow(dumbFishData, i, j) {
	countOfGlows++;
	dumbFishData[i][j] = 0;
	glowedPoints.push({ i, j });
	const neighbours = getNeighbours(dumbFishData, i, j);
	for (const neighbour of neighbours.adjacentPoints) {
		const { i, j, number } = neighbour;
		if (!glowedPoints.some((e) => e.i === i && e.j === j)) {
			dumbFishData[i][j]++;
		}
	}
}

function calculateFlashTimes(dumbFishData, i) {
	// console.log(dumbFishData);
	for (let i = 0; i < dumbFishData.length; i++) {
		const row = dumbFishData[i];
		for (let j = 0; j < row.length; j++) {
			row[j]++;
		}
	}

	glowUp();

	function isAllZero(dumbFishData) {
		for (let i = 0; i < dumbFishData.length; i++) {
			const row = dumbFishData[i];
			for (let j = 0; j < row.length; j++) {
				if (row[j] > 0) {
					return false;
				}
			}
		}
		return true;
	}

	function anyElementIsStillGreaterThanNine(dumbFishData) {
		for (let i = 0; i < dumbFishData.length; i++) {
			const row = dumbFishData[i];
			for (let j = 0; j < row.length; j++) {
				if (row[j] > 9) {
					return true;
				}
			}
		}
		return false;
	}

	function glowUp() {
		for (let i = 0; i < dumbFishData.length; i++) {
			const row = dumbFishData[i];
			for (let j = 0; j < row.length; j++) {
				if (row[j] > 9) {
					lookUpNeighboursAndGlow(dumbFishData, i, j);
				}
			}
		}

		if (anyElementIsStillGreaterThanNine(dumbFishData)) {
			glowUp();
		}
	}

	glowedPoints = [];
	if (isAllZero(dumbFishData)) {
		console.log('the step you are looking for is', i);
		// break
		return;
	}
	// console.log('<!=====!>');
	// console.log(dumbFishData);
	// console.log('<!=====!>');
}

// console.log(input);
for (let i = 1; i <= 300; i++) {
	calculateFlashTimes(input, i);
}
console.log(countOfGlows);
