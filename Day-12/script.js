import * as fs from 'fs/promises';

let input = await fs.readFile('./input.txt', 'utf-8');

input = input.split('\n').map((e) => e.split('-'));

const traversedPaths = new Set();
let tempPath = [];

const isLowerCase = (str) =>
	str == str.toLowerCase() && str != str.toUpperCase();

// i hate this. Why am i so dumb?
const tempPathCondition = (p, c) => {
	let restFiltered = p.filter(
		(e) => isLowerCase(e) && e !== 'start' && e !== c
	);
	let cFiltered = p.filter((e) => e === c);
	if (cFiltered.length === 2) {
		return true;
	}
	if (cFiltered.length < 2) {
		let setTest = new Set(restFiltered);
		if (setTest.size < restFiltered.length) {
			//then something is duplicated already we should return true
			return true;
		} else {
			return false;
		}
	}
};

const getConnections = (paths, name) => {
	tempPath.push(name);
	if (name === 'end') {
		traversedPaths.add([...tempPath]);
	}

	let connections = paths
		.filter((e) => e.includes(name))
		.map((e) => e.filter((s) => s !== name))
		.flatMap((e) => e);
	if (name === 'start') {
		paths = paths.filter((e) => !e.includes('start'));
	}

	for (const connection of connections) {
		if (
			tempPath.includes(connection) &&
			isLowerCase(connection) &&
			tempPathCondition(tempPath, connection)
		)
			continue;
		if (name === 'end') {
			break;
		} else {
			getConnections(paths, connection);
		}
	}
	tempPath.pop();
};

getConnections(input, 'start');

console.log('Size in part 1', traversedPaths.size);
