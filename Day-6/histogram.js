import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf8');
let data = input.split(',').filter((e) => e !== '');

// this will be the count of lanternfish in each val/state.
let lanternFishValues = new Array(9).fill(0);
// Let's fill this with initial values
data.forEach((v) => {
	lanternFishValues[v]++;
});

function calculateLanternFishCount(days) {
	for (let i = 1; i <= days; i++) {
		// we have to update the count each day!
		//let's loop through the lanternfish
		let copyOfLanternFish = [...lanternFishValues];
		for (let j = 0; j < lanternFishValues.length; j++) {
			if (j === 6) {
				lanternFishValues[j] = copyOfLanternFish[0] + copyOfLanternFish[7];
			} else if (j === 8) {
				lanternFishValues[j] = copyOfLanternFish[0];
			} else {
				lanternFishValues[j] = copyOfLanternFish[j + 1];
			}
		}
	}
	const sum = lanternFishValues.reduce((acc, cur) => acc + cur);
	return sum;
}

//part1
const totalPufferFishPart1 = calculateLanternFishCount(256);
console.log(totalPufferFishPart1);
