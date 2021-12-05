import * as fs from 'fs/promises';

let BINGO_BOARD_DIMESIONS = 5;

const input = await fs.readFile('input.txt', 'utf8');
let data = input.split('\n').filter((e) => e !== '');
const arrayOfInstructions = data[0].split(',').map((e) => +e);
console.log(arrayOfInstructions);
data.splice(0, 1);

let noOfBingoBoards = data.length / BINGO_BOARD_DIMESIONS;

const bingoBoards = [];
for (let index = 0; index < noOfBingoBoards; index++) {
	const bingoBoard = data.slice(
		index * BINGO_BOARD_DIMESIONS,
		index * BINGO_BOARD_DIMESIONS + BINGO_BOARD_DIMESIONS
	);
	let boardDummy = [];
	bingoBoard.forEach((bingoNumbers) => {
		const splitNumbers = bingoNumbers
			.split(' ')
			.filter((e) => e !== '')
			.map((x) => ({ val: +x, marked: false }));
		boardDummy.push(splitNumbers);
	});
	bingoBoards.push(boardDummy);
}

// playBingo(?)

function bingoSuccess(board, currNum) {
	let sum = 0;
	for (let i = 0; i < board.length; i++) {
		const row = board[i];
		for (let j = 0; j < row.length; j++) {
			if (!row[j].marked) {
				sum += row[j].val;
			}
		}
	}
	console.log('Final Score', sum * currNum);
}

function checkHorizontalBingo(numToMark) {
	for (let i = 0; i < noOfBingoBoards; i++) {
		for (let j = 0; j < bingoBoards[i].length; j++) {
			const bingoBoard = bingoBoards[i];
			const bingoBoardRow = bingoBoard[j];
			const bingo = bingoBoardRow.every((e) => e.marked === true);
			if (bingo) {
				console.log('ROW BINGO => ', bingoBoardRow);
				bingoSuccess(bingoBoard, numToMark);
				process.exit();
			}
		}
	}
}

function checkVerticalBingo(numToMark) {
	for (let i = 0; i < noOfBingoBoards; i++) {
		for (let j = 0; j < BINGO_BOARD_DIMESIONS; j++) {
			const bingoBoard = bingoBoards[i];
			let colElements = [];
			for (let k = 0; k < BINGO_BOARD_DIMESIONS; k++) {
				colElements.push(bingoBoard[k][j]);
			}
			const bingo = colElements.every((e) => e.marked === true);
			if (bingo) {
				console.log('COL BINGO => ', colElements);
				bingoSuccess(bingoBoard, numToMark);
				process.exit();
			}
		}
	}
}

function markNumber(num) {
	for (let i = 0; i < noOfBingoBoards; i++) {
		for (let j = 0; j < bingoBoards[i].length; j++) {
			const bingoBoard = bingoBoards[i];
			for (let k = 0; k < BINGO_BOARD_DIMESIONS; k++) {
				if (bingoBoard[j][k].val === num && bingoBoard[j][k].marked === false) {
					bingoBoard[j][k].marked = true;
				}
			}
		}
	}
}

for (let i = 0; i < arrayOfInstructions.length; i++) {
	const curr = arrayOfInstructions[i];
	markNumber(curr);
	if (i < 5) {
		continue;
	}
	checkHorizontalBingo(curr);
	checkVerticalBingo(curr);
}

// console.dir(bingoBoards, { depth: null });
