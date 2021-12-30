import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf8');

const data = input.split(',').map(Number);
const sorted = data.sort((a, b) => a - b);

function calculateMedian(data) {
	let medianIndex, median;
	if (data.length % 2 === 0) {
		medianIndex = data.length / 2;
		median = (data[medianIndex - 1] + data[medianIndex]) / 2;
		return median;
	}
	medianIndex = (data.length + 1) / 2;
	return data[medianIndex - 1];
}

function calculateMean(data) {
	const sum = data.reduce((acc, curr) => acc + curr, 0);
	const mean = sum / data.length;
	return Math.round(mean);
}

const median = calculateMedian(sorted);
const mean = calculateMean(sorted);

function calculateFuelScore(horizontalPos, median) {
	let fuelSum = 0;
	for (let pos of horizontalPos) {
		const diff = Math.abs(pos - median);
		fuelSum += diff;
	}
	console.log('fuelSum (normal) => ', fuelSum);
}

function calcualteWeightedFuelScore(horizontalPos, mean) {
	// process.stdout.write(JSON.stringify(mean));
	// let fuelSum = 0;
	// for (const pos of horizontalPos) {
	// 	const diff = Math.abs(pos - mean);
	// 	const sum = (diff * (diff + 1)) / 2;
	// 	fuelSum += sum;
	// }
	// console.log('weighted sum =>', fuelSum);
	/** 
	 * ^^ the above is off by one. (it will be always near mean) the d/dx is 0 and we get a step function 
	*/

	let sum = [];
	for (
		let i = horizontalPos[0];
		i <= horizontalPos[horizontalPos.length - 1];
		i++
	) {
		let loopSum = 0;
		for (let j = 0; j < horizontalPos.length; j++) {
			let diff = Math.abs(horizontalPos[j] - i);
			let tSum = (diff * (diff + 1)) / 2;
			loopSum += tSum;
		}
		sum.push(loopSum);
	}
	sum = sum.sort((a, b) => a - b);
	console.log(sum);
}

calculateFuelScore(data, median);
calcualteWeightedFuelScore(data, mean);
