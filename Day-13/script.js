import * as fs from 'fs/promises';

const input = await fs.readFile('./input.txt', 'utf8');

let [coords, folds] = input.split('\n\n');

const paper = coords.split('\n').map((point) => {
	let p = point.split(',');
	return {
		x: Number(p[0]),
		y: Number(p[1]),
	};
});

folds = folds.split('\n').map((f) => {
	const splitF = f.split(' ');
	const foldLine = splitF[2].split('=');
	return [foldLine[0], Number(foldLine[1])];
});

// console.log([paper, folds]);
// console.log('======');

//part 1 we are only interested in first fold

function drawPaper(paper) {
	let count = 0;
	let maxX = 0;
	let maxY = 0;
	for (const p of paper) {
		if (p.x >= maxX) {
			maxX = p.x;
		} else if (p.y >= maxY) {
			maxY = p.y;
		}
		continue;
	}
	for (let j = 0; j <= maxY; j++) {
		for (let k = 0; k <= maxX; k++) {
			if (paper.some((e) => e.x === k && e.y === j)) {
				count++;
				process.stdout.write('#');
			} else {
				process.stdout.write('.');
			}
		}
		process.stdout.write('\n');
	}
	return count;
}

function foldVertically(paper, foldLine) {
	console.log('vertical folding along ', foldLine);
	paper.forEach((p) => {
		if (p.x > foldLine) {
			let delta = p.x - foldLine;
			p.x = foldLine - delta;
		}
	});
}

function foldHorizontally(paper, foldLine) {
	console.log('horizontal folding along ', foldLine);
	paper.forEach((p) => {
		if (p.y > foldLine) {
			let delta = p.y - foldLine;
			p.y = foldLine - delta;
		}
	});
}

function doTransparentOrigami(paper, foldTimes = 12) {
	let count;
	for (let i = 0; i < foldTimes; i++) {
		const foldLine = folds[i];
		if (foldLine[0] === 'x') {
			foldVertically(paper, foldLine[1]);
			count = drawPaper(paper);
		} else {
			foldHorizontally(paper, foldLine[1]);
			count = drawPaper(paper);
		}
	}
	console.log(count);
}

doTransparentOrigami(paper);
