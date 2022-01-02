import * as fs from 'fs/promises';
import path from 'path';

let input = await fs.readFile('./input.txt', 'utf-8');

input = input.split('\n').map((e) => e.split('-'));

const traversedPaths = new Set();
let tempPath = [];

const isLowerCase = (str) =>
	str == str.toLowerCase() && str != str.toUpperCase();

const tempPathCondition = (t) => {
	console.log(t);
	return true;
};

const getConnections = (paths, name) => {
	tempPath.push(name);
	if (name === 'end') {
		traversedPaths.add([...tempPath]);
		// console.log({ traversedPaths });
		// tempPath.pop();
		// return;
	}
	let connections = paths
		.filter((e) => e.includes(name))
		.map((e) => e.filter((s) => s !== name))
		.flatMap((e) => e);
	if (name === 'start') {
		paths = paths.filter((e) => !e.includes('start'));
	}
	// console.log({ tempPath });
	// console.log({ name });
	// console.log({ connections });
	// console.log('%%%%%%');

	for (const connection of connections) {
		if (
			tempPath.includes(connection) &&
			isLowerCase(connection) &&
			tempPathCondition(tempPath)
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
