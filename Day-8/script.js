import * as fs from 'fs/promises';

const input = await fs.readFile('./input.txt', 'utf-8');

// part 1

const formattedData = input
	.split('\n')
	.map((s) => s.split(' | '))
	.map(([ip, op]) => ({
		input: ip,
		output: op,
	}));

let part1Lengths = [2, 3, 4, 7];
let count = 0;
for (const { output } of formattedData) {
	output.split(' ').forEach((ele) => {
		if (part1Lengths.includes(ele.length)) {
			count++;
		}
	});
}
console.log('part one count is =>', count);

// Part 2

function caclulateNoOfOccurences(arr) {
	const countObj = {};
	arr.forEach((e) => {
		if (!countObj[e]) {
			countObj[e] = 1;
		} else {
			countObj[e]++;
		}
	});
	return countObj;
}

function calculateZeroPos(segments, mapping) {
	let sevenOrOne = segments.filter((s) => s.length === 2 || s.length === 3);
	sevenOrOne = sevenOrOne.map((e) => e.split('')).flatMap((e) => e);
	const countObj = caclulateNoOfOccurences(sevenOrOne);
	for (const segment in countObj) {
		if (countObj[segment] === 1) {
			mapping[0] = segment;
		}
	}
}

function calculateFifthAndSecondPos(segments, mapping) {
	let ofLengthSix = segments.filter((s) => s.length === 6);
	let ofLengthTwo = segments.filter((s) => s.length === 2);
	let combined = [...ofLengthSix, ...ofLengthTwo];
	combined = combined.map((e) => [...e]).flatMap((e) => e);
	const countObj = caclulateNoOfOccurences(combined);
	for (const segment in countObj) {
		if (countObj[segment] === 4) {
			mapping[5] = segment;
			mapping[2] = [...ofLengthTwo[0]].filter((e) => e !== segment)[0];
		}
	}
}

function calculateFirstAndThird(segments, mapping) {
	let ofLengthSix = segments.filter((s) => s.length === 6);
	let ofLengthFour = segments.filter((s) => s.length === 4);
	let combined = [...ofLengthSix, ...ofLengthFour];
	combined = combined.map((e) => [...e]).flatMap((e) => e);
	const countObj = caclulateNoOfOccurences(combined);
	for (const segment in countObj) {
		if (countObj[segment] === 4 && !mapping.includes(segment)) {
			mapping[1] = segment;
			mapping[3] = [...ofLengthFour[0]].filter((s) => !mapping.includes(s))[0];
		}
	}
}

function calculateSixthPos(segments, mapping) {
	let ofLengthSix = segments.filter((s) => s.length === 6);
	let combined = ofLengthSix.map((e) => [...e]).flatMap((e) => e);
	const countObj = caclulateNoOfOccurences(combined);
	for (const segment in countObj) {
		if (countObj[segment] === 3 && !mapping.includes(segment)) {
			mapping[6] = segment;
		}
	}
}

function calculateFourthPos(segments, mapping) {
	let ofLengthEight = segments.filter((s) => s.length === 7);
	let spread = [...ofLengthEight[0]];
	for (const seg of spread) {
		if (!mapping.includes(seg)) {
			mapping[4] = seg;
		}
	}
}

let partTwoSum = 0;
function calculateSevenSegmentValues(notes) {
	for (let note of notes) {
		function guessMapping(note) {
			let mapping = new Array(7).fill(null);
			const segments = note.split(' ');
			calculateZeroPos(segments, mapping);
			calculateFifthAndSecondPos(segments, mapping);
			calculateFirstAndThird(segments, mapping);
			calculateSixthPos(segments, mapping);
			calculateFourthPos(segments, mapping);
			return mapping;
		}

		function mapSegmentToNumber(nums) {
			switch (nums) {
				case '1011101':
					return 2;
				case '1011011':
					return 3;
				case '1101011':
					return 5;
				case '1110111':
					return 0;
				case '1101111':
					return 6;
				case '1111011':
					return 9;
				default:
					throw new Error('something went wrong!');
			}
		}

		function inferSevenSegmentValues(output, mapping) {
			let outputArr = output.split(' ');
			let numbers = [];
			for (let i = 0; i < outputArr.length; i++) {
				let spread = [...outputArr[i]];
				switch (true) {
					case spread.length === 2:
						numbers[i] = 1;
						break;
					case spread.length === 3:
						numbers[i] = 7;
						break;
					case spread.length === 4:
						numbers[i] = 4;
						break;

					case spread.length === 7:
						numbers[i] = 8;
						break;

					case spread.length === 5 || spread.length === 6:
						let tempArr = new Array(7).fill(0);
						for (let j = 0; j < spread.length; j++) {
							if (mapping.indexOf(spread[j]) !== -1) {
								tempArr[mapping.indexOf(spread[j])] = 1;
							}
						}
						const num = mapSegmentToNumber(tempArr.join(''));
						numbers[i] = num;
						break;

					default:
						throw new Error('something went wrong here!');
				}
			}
			return numbers;
		}
		const mapping = guessMapping(note.input);
		const inferedNumber = inferSevenSegmentValues(note.output, mapping);
		partTwoSum += Number(inferedNumber.join(''));
	}
	console.log('Part 2 sum is => ', partTwoSum);
}

calculateSevenSegmentValues(formattedData);
