import * as fs from 'fs/promises';

const input = await fs.readFile('./input.txt', 'utf-8');
const formattedInput = input.split('\n').map((e) => e.split('').map(Number));

function getAdjacentElement(depthData, i, j) {
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
	} else if (i === 0) {
		adjacentPoints.push({ number: depthData[i][j - 1], i: i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i: i, j: j + 1 });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
	} else if (j === 0) {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j + 1], i, j: j + 1 });
	} else if (i === depthData.length - 1) {
		adjacentPoints.push({ number: depthData[i][j - 1], i: i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i: i, j: j + 1 });
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
	} else if (j === depthData[0].length - 1) {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j - 1], i, j: j - 1 });
	} else {
		adjacentPoints.push({ number: depthData[i - 1][j], i: i - 1, j });
		adjacentPoints.push({ number: depthData[i + 1][j], i: i + 1, j });
		adjacentPoints.push({ number: depthData[i][j - 1], i, j: j - 1 });
		adjacentPoints.push({ number: depthData[i][j + 1], i, j: j + 1 });
	}
	return {
		adjacentPoints,
	};
}

// let count = 0;
let traversedPoints;
function startBackTracking(adjacentData, nums, depthData) {
	if (
		traversedPoints.filter((e) => e.i === nums.i && e.j === nums.j).length === 0
	) {
		// console.log(traversedPoints);
		traversedPoints.push({ i: nums.i, j: nums.j });
	}
	const arr = adjacentData.adjacentPoints.filter((e) => e.number !== 9);
	for (let i = 0; i < arr.length; i++) {
		let adjacents = getAdjacentElement(depthData, arr[i].i, arr[i].j);
		let data = {};
		data.adjacentPoints = adjacents.adjacentPoints.filter(
			(e) => !traversedPoints.some((p) => p.i === e.i && p.j === e.j)
		);
		startBackTracking(data, { i: arr[i].i, j: arr[i].j }, depthData);
	}
	return;
}

function calculateLowPoint(depthData) {
	let sum = 0;
	let lengthsArr = [];
	outerLoop: for (let i = 0; i < depthData.length; i++) {
		innerLoop: for (let j = 0; j < depthData[i].length; j++) {
			const adjacentData = getAdjacentElement(depthData, i, j);
			const lowPoint = adjacentData.adjacentPoints.every(
				(e) => e.number > depthData[i][j]
			);
			if (lowPoint) {
				//we need to get the adjacentElements and look ath their adjacent elements recursively
				// console.log(adjacentData);
				sum += depthData[i][j] + 1;
				traversedPoints = [];
				startBackTracking(adjacentData, { i, j }, depthData);
				lengthsArr.push(traversedPoints.length);
				//  getAdjacentElement(depthData, );
			}
		}
	}
	console.log('sum for part 1 =>', sum);
	const sorted = lengthsArr.sort((a, b) => b - a);
	console.log('product is => ', sorted[0] * sorted[1] * sorted[2]);
}

calculateLowPoint(formattedInput);
