import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf8');
let data = input.split('\n').filter((e) => e !== '');
const NEED_ONLY_HOR_AND_VERT = true;
const secondaryArray = [];
const verOrHor = [];
data.forEach((ele) => {
	const points = ele
		.split(' -> ')
		.map((p) => p.split(',').map((e) => +e))
		.map((e) => {
			return {
				x: e[0],
				y: e[1],
			};
		});
	if (NEED_ONLY_HOR_AND_VERT) {
		if (
			points[0]['x'] === points[1]['x'] ||
			points[0]['y'] === points[1]['y']
		) {
			verOrHor.push(points);
		}
	}
});

verOrHor.forEach((point) => {
	let pointOfInterest = point;
	let possiblePoints = {};
	if (pointOfInterest[0].y === pointOfInterest[1].y) {
		possiblePoints.y = [pointOfInterest[0].y];
		possiblePoints.x = [];
		if (pointOfInterest[0].x >= pointOfInterest[1].x) {
			for (let i = pointOfInterest[1].x; i <= pointOfInterest[0].x; i++) {
				possiblePoints.x.push(i);
			}
		} else {
			for (let i = pointOfInterest[0].x; i <= pointOfInterest[1].x; i++) {
				possiblePoints.x.push(i);
			}
		}
	} else if (pointOfInterest[0].x === pointOfInterest[1].x) {
		possiblePoints.x = [pointOfInterest[0].x];
		possiblePoints.y = [];
		if (pointOfInterest[0].y >= pointOfInterest[1].y) {
			for (let i = pointOfInterest[1].y; i <= pointOfInterest[0].y; i++) {
				possiblePoints.y.push(i);
			}
		} else {
			for (let i = pointOfInterest[0].y; i <= pointOfInterest[1].y; i++) {
				possiblePoints.y.push(i);
			}
		}
	}
	secondaryArray.push(possiblePoints);
});

// console.log(secondaryArray[0]);
let count = 0;
let traversedPoints = [];
function calculateAndSumPoints(point, i) {
	const { x, y } = point;
	if (x.length === 1) {
		// now we have a line that vertical.
		for (let j = secondaryArray.length - 1; j >= 0; j--) {
			if (i !== j) {
				// we need to intersect??
				// console.log('Second', secondaryArray[j]);
				if (
					secondaryArray[j].x.length === 1 &&
					secondaryArray[j].x[0] === x[0]
				) {
					// this means the lines are vertical and have the same x value?
					const commonPoints = secondaryArray[j].y.filter((yVal) =>
						y.includes(yVal)
					);
					commonPoints.forEach((yVal) => {
						if (!traversedPoints.some((e) => e[0] === x[0] && e[1] === yVal)) {
							count++;
							traversedPoints.push([x[0], yVal]);
						}
					});
				} else if (
					secondaryArray[j].y.length === 1 &&
					y.includes(secondaryArray[j].y[0]) &&
					secondaryArray[j].x.includes(x[0])
				) {
					if (
						!traversedPoints.some(
							(e) => e[0] === x[0] && e[1] === secondaryArray[j].y[0]
						)
					) {
						count++;
						traversedPoints.push([x[0], secondaryArray[j].y[0]]);
					}
				}
			}
		}
	} else if (y.length === 1) {
		for (let j = secondaryArray.length - 1; j >= 0; j--) {
			if (i !== j) {
				// we need to intersect??
				// console.log('Second', secondaryArray[j]);
				if (
					secondaryArray[j].y.length === 1 &&
					secondaryArray[j].y[0] === y[0]
				) {
					// this means the lines are vertical and have the same x value?
					const commonPoints = secondaryArray[j].x.filter((xVal) =>
						x.includes(xVal)
					);
					commonPoints.forEach((xVal) => {
						if (!traversedPoints.some((e) => e[0] === xVal && e[1] === y[0])) {
							count++;
							traversedPoints.push([xVal, y[0]]);
						}
					});
				} else if (
					secondaryArray[j].x.length === 1 &&
					x.includes(secondaryArray[j].x[0]) &&
					secondaryArray[j].y.includes(y[0])
				) {
					if (
						!traversedPoints.some(
							(e) => e[0] === secondaryArray[j].x[0] && e[1] === y[0]
						)
					) {
						count++;
						traversedPoints.push([secondaryArray[j].x[0], y[0]]);
					}
				}
			}
		}
	}
}

for (let i = secondaryArray.length - 1; i >= 0; i--) {
	calculateAndSumPoints(secondaryArray[i], i);
	secondaryArray.splice(i, 1);
}

console.log('Intersecting Points => Part1', traversedPoints);
console.log('No of vents part 1', count);
// process.stdout.write(JSON.stringify(markedPoints));
