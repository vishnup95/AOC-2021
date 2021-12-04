import * as fs from 'fs/promises';
//top level await works!
const data = await fs.readFile('input.txt', 'utf8');

const newArr = [];
let count = 0;
data.split('\n').forEach((line) => {
	newArr.push(parseInt(line, 10));
});

// seems like a great place for reduce!
newArr.reduce((prev, curr) => {});

for (let index = 1; index < newArr.length; index++) {
	const prevElement = newArr[index - 1];
	if (newArr[index] > prevElement) {
		count++;
	}
}

console.log('The number of times depth increased is', count);

/**
 * Part 2 below
 */

let prevSum = 0,
	sum = 0;
let slidingCount = 0;
for (let i = 0; i < newArr.length; i++) {
	if (i <= 2) {
		sum += newArr[i];
		prevSum = sum;
		continue;
	} else {
		sum += newArr[i] - newArr[i - 3];
	}
	if (prevSum < sum) {
		slidingCount++;
	}
	prevSum = sum;
}
console.log('The number of sliding window(3) depth increases', slidingCount);

// console.log(sum);
