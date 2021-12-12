import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf8');
let data = input
	.split(',')
	.filter((e) => e !== '')
	.map((e) => {
		const num = +e;
		return BigInt(num);
	});

const bigIntArray = new BigInt64Array(data);
console.log(bigIntArray);

function breedingLanterns(lanternData, noOfDays = 200) {
	let dayLength = lanternData.length;
	for (let i = 1; i <= noOfDays; i++) {
		for (let j = 0; j < dayLength; j++) {
			if (lanternData[j] === 0n) {
				lanternData[j] = 6n;
				lanternData.push(8n);
			} else {
				lanternData[j]--;
			}
		}
		dayLength = lanternData.length;
	}
	// console.log(lanternData);
	console.log(lanternData.length);
}

breedingLanterns(data);
