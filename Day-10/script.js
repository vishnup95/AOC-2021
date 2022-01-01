import * as fs from 'fs/promises';

let input = await fs.readFile('./input.txt', 'utf-8');
input = input.split('\n').map((e) => e.split(''));

//[({(<(())[]>[[{[]{<()<>>
const openingChars = ['(', '<', '{', '['];
const closingChars = [')', '>', '}', ']'];

const findClosingChar = (char) => {
	switch (char) {
		case openingChars[0]:
			return closingChars[0];
		case openingChars[1]:
			return closingChars[1];
		case openingChars[2]:
			return closingChars[2];
		case openingChars[3]:
			return closingChars[3];
		default:
			throw new Error('something is seriously wrong!');
	}
};

const calculateSortedAutoCompleScore = (arr) => {
	arr = arr.sort((a, b) => a - b);
	console.log(arr[(arr.length + 1) / 2 - 1]);
};

const calculateSyntaxErrorScores = (codes) => {
	let syntaxScore = 0;
	let autoCompleteScoreArr = [];
	for (const line of codes) {
		let autoCompleteScore = 0;
		let legalClosingSymbols = [];
		let isCorrupt = false;
		for (const char of line) {
			if (openingChars.includes(char)) {
				legalClosingSymbols.push(findClosingChar(char));
			} else if (
				closingChars.includes(char) &&
				legalClosingSymbols[legalClosingSymbols.length - 1] === char
			) {
				// still legal, we can continue and pop the array
				legalClosingSymbols.pop();
			} else {
				// console.log(char);
				isCorrupt = true;
				if (char === closingChars[0]) {
					syntaxScore += 3;
				}
				if (char === closingChars[1]) {
					syntaxScore += 25137;
				}
				if (char === closingChars[2]) {
					syntaxScore += 1197;
				}
				if (char === closingChars[3]) {
					syntaxScore += 57;
				}
				break;
				// throw new Error('we are corrupt!');
			}
		}
		if (!isCorrupt) {
			// console.log(line);
			// console.log('legalClosingSymbols', legalClosingSymbols);
			legalClosingSymbols = legalClosingSymbols.reverse();
			legalClosingSymbols.forEach((symbol) => {
				autoCompleteScore *= 5;
				if (symbol === closingChars[0]) {
					autoCompleteScore += 1;
				}
				if (symbol === closingChars[1]) {
					autoCompleteScore += 4;
				}
				if (symbol === closingChars[2]) {
					autoCompleteScore += 3;
				}
				if (symbol === closingChars[3]) {
					autoCompleteScore += 2;
				}
			});
			autoCompleteScoreArr.push(autoCompleteScore);
		}
	}
	console.log('the sum of the corrupted lines are =>', syntaxScore);
	calculateSortedAutoCompleScore(autoCompleteScoreArr);
};

calculateSyntaxErrorScores(input);
