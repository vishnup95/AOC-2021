import * as fs from 'fs/promises';

async function readInput() {
	const input = await fs.readFile('./input.txt', 'utf-8');
	const [template, rawInsertionPairs] = input.split('\n\n');
	const insertionPairs = formatInsertionPairs(rawInsertionPairs);
	const templateArr = template.split('');
	doPolymerization(templateArr, insertionPairs, 10);
	doPolymerization(templateArr, insertionPairs, 40);
}

function formatInsertionPairs(rawInsertionPairs) {
	let insertionPairs = new Map();
	rawInsertionPairs.split('\n').forEach((e) => {
		const splitPairs = e.split(' -> ');
		insertionPairs.set(splitPairs[0], splitPairs[1]);
	});
	return insertionPairs;
}

function createPairTemplateMap(template) {
	let pairCount = new Map();
	let singleCount = new Map();
	for (let j = 0; j < template.length - 1; j++) {
		let pair = [template[j], template[j + 1]].join('');
		if (pairCount.has(pair)) {
			let val = pairCount.get(pair);
			pairCount.set(pair, val + 1);
		} else {
			pairCount.set(pair, 1);
		}
	}
	for (let j = 0; j < template.length; j++) {
		if (singleCount.has(template[j])) {
			let val = singleCount.get(template[j]);
			singleCount.set(template[j], val + 1);
		} else {
			singleCount.set(template[j], 1);
		}
	}
	return [pairCount, singleCount];
}

function caclulateMaxDiffMin(singleCount) {
	let max = 0;
	let min = singleCount.entries().next().value[1];
	for (const [key, val] of singleCount) {
		if (val > max) {
			max = val;
		}
		if (val < min) {
			min = val;
		}
	}
	console.log(max - min);
}

function doPolymerization(template, insertionPairs, days) {
	let [pairCounts, singleCount] = createPairTemplateMap(template);
	for (let i = 1; i < days + 1; i++) {
		let newMap = new Map();
		for (const [pair, count] of pairCounts) {
			const insertionValue = insertionPairs.get(pair);
			if (singleCount.has(insertionValue)) {
				let val = singleCount.get(insertionValue);
				singleCount.set(insertionValue, val + count);
			} else {
				singleCount.set(insertionValue, 1);
			}
			const pairs = [pair[0] + insertionValue, insertionValue + pair[1]];
			for (const p of pairs) {
				if (newMap.has(p)) {
					let val = newMap.get(p);
					newMap.set(p, count + val);
				} else {
					newMap.set(p, count);
				}
			}
		}
		pairCounts = newMap;
	}
	// console.log(pairCounts);
	// console.log(singleCount);
	caclulateMaxDiffMin(singleCount);
}

readInput();
