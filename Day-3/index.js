import * as fs from 'fs/promises';
const input = await fs.readFile('input.txt', 'utf8');
let data = input.split('\n');
let binLength = data[0].length;

function convertStringToBin(bin) {
	const binaries = bin.split('');
	let digit = 0;
	binaries.reverse().forEach((ele, idx) => {
		if (ele === '1') {
			digit += Math.pow(2, idx);
		}
	});
	return digit;
}

function calculatePowerConsumption(data, binLength) {
	let gammaValue = '';
	let epsilonValue = '';
	while (binLength) {
		let countOfZero = 0;
		let countOfOne = 0;
		data.forEach((ele) => {
			const binArr = ele.split('');
			const bit = binArr[data[0].length - binLength];
			if (bit === '0') {
				countOfZero++;
			} else {
				countOfOne++;
			}
		});
		if (countOfOne > countOfZero) {
			gammaValue += '1';
			epsilonValue += '0';
		} else {
			gammaValue += '0';
			epsilonValue += '1';
		}
		binLength--;
	}
	const gammaDecimal = convertStringToBin(gammaValue);
	const epsilonDecimal = convertStringToBin(epsilonValue);
	console.log('Power consumption', gammaDecimal * epsilonDecimal);
}
calculatePowerConsumption(data, binLength);

/**
 * Part 2 - Life support rating
 * clean this up for fucks sake!
 */
function calculatePart2Metric(data, binLength, greaterCheck, lesserCheck) {
	let copyOfData = data.slice();
	let diagnosticData;
	while (binLength !== -1) {
		let countOfZero = 0;
		let countOfOne = 0;
		diagnosticData = copyOfData.slice();
		copyOfData.forEach((ele) => {
			const binArr = ele.split('');
			const bit = binArr[copyOfData[0].length - binLength];
			if (bit === '0') {
				countOfZero++;
			} else {
				countOfOne++;
			}
		});
		if (countOfOne >= countOfZero) {
			diagnosticData.forEach((ele) => {
				if (ele[copyOfData[0].length - binLength] === greaterCheck) {
					const idx = copyOfData.indexOf(ele);
					copyOfData.splice(idx, 1);
				}
			});
		} else {
			diagnosticData.forEach((ele) => {
				if (ele[copyOfData[0].length - binLength] === lesserCheck) {
					const idx = copyOfData.indexOf(ele);
					copyOfData.splice(idx, 1);
				}
			});
		}
		binLength--;
		if (diagnosticData.length === 1) {
			binLength = -1;
		}
	}
	return diagnosticData[0];
}
const binO2 = calculatePart2Metric(data, binLength, '0', '1');
const decO2 = convertStringToBin(binO2);
const binCO2 = calculatePart2Metric(data, binLength, '1', '0');
const decCO2 = convertStringToBin(binCO2);

console.log('life support rating', decCO2 * decO2);
