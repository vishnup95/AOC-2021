import * as fs from 'fs/promises';
//top level await works!
const data = await fs.readFile('input.txt', 'utf8');

let subPosPart1 = {
	d: 0,
	h: 0,
};

data.split('\n').forEach((s) => {
	const [direction, value] = s.split(' ');
	let parsedVal = parseInt(value, 10);
	switch (direction) {
		case 'forward':
			subPosPart1.h += parsedVal;
			break;

		case 'up':
			subPosPart1.d -= parsedVal;
			break;

		case 'down':
			subPosPart1.d += parsedVal;

		default:
			break;
	}
});

console.log('PART 1', subPosPart1.d * subPosPart1.h);

/**
 * Part 2 below
 */

let subPosPart2 = {
	d: 0,
	h: 0,
	a: 0,
};

data.split('\n').forEach((s) => {
	const [direction, value] = s.split(' ');
	let parsedVal = parseInt(value, 10);
	switch (direction) {
		case 'forward':
			subPosPart2.h += parsedVal;
			subPosPart2.d += subPosPart2.a * parsedVal;
			break;

		case 'up':
			subPosPart2.a -= parsedVal;
			break;

		case 'down':
			subPosPart2.a += parsedVal;

		default:
			break;
	}
});

console.log('PART 2', subPosPart2.h * subPosPart2.d);
