import fs from 'fs';
const puzzle_input = fs.readFileSync('./input.txt', 'utf8');

// Preparing data
const data = puzzle_input
	.split('\n')
	.map((line) =>
		line.split(' -> ').map((xy) => xy.split(',').map((el) => parseInt(el)))
	);

function solvePuzzle(part = 1) {
	// Creating the diagram
	var diagram = new Array(1000);
	diagram.fill(0);
	for (var i = 0; i < diagram.length; i++) {
		diagram[i] = new Array(1000);
		diagram[i].fill(0);
	}

	// "Drawing" the lines
	data.forEach((line) => {
		let x1 = line[0][0];
		let y1 = line[0][1];

		let x2 = line[1][0];
		let y2 = line[1][1];

		if (x1 === x2) {
			if (y2 > y1) {
				for (let step = y1; step <= y2; step++) {
					diagram[step][x1]++;
				}
			} else {
				for (let step = y1; step >= y2; step--) {
					diagram[step][x1]++;
				}
			}
		} else if (y1 === y2) {
			if (x2 > x1) {
				for (let step = x1; step <= x2; step++) {
					diagram[y1][step]++;
				}
			} else {
				for (let step = x1; step >= x2; step--) {
					diagram[y1][step]++;
				}
			}
			// For part 2, also consider diagonal lines
		} else {
			if (part !== 2) return;

			let xSteps = [];
			let ySteps = [];

			if (x2 > x1 && y2 > y1) {
				for (let step = x1; step <= x2; step++) xSteps.push(step);
				for (let step = y1; step <= y2; step++) ySteps.push(step);
				xSteps.forEach((x, i) => diagram[ySteps[i]][x]++);
			} else if (x2 < x1 && y2 < y1) {
				for (let step = x1; step >= x2; step--) xSteps.push(step);
				for (let step = y1; step >= y2; step--) ySteps.push(step);
				xSteps.forEach((x, i) => diagram[ySteps[i]][x]++);
			} else if (x2 > x1 && y2 < y1) {
				for (let step = x1; step <= x2; step++) xSteps.push(step);
				for (let step = y1; step >= y2; step--) ySteps.push(step);
				xSteps.forEach((x, i) => diagram[ySteps[i]][x]++);
			} else if (x2 < x1 && y2 > y1) {
				for (let step = x1; step >= x2; step--) xSteps.push(step);
				for (let step = y1; step <= y2; step++) ySteps.push(step);
				xSteps.forEach((x, i) => diagram[ySteps[i]][x]++);
			}
		}
	});

	// Count overlapping lines
	let count = 0;
	diagram.forEach((row) => row.forEach((num) => (num >= 2 ? count++ : num)));

	console.log(
		`Part ${part}: The lines overlap at \x1b[33m${count}\x1b[0m points.`
	);
}

solvePuzzle(1);
solvePuzzle(2);
