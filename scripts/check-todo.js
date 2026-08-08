"use strict";

const fs = require("fs");
const path = require("path");

const articlesDir = path.resolve(__dirname, "..", "articles");

function reviewFiles(directory) {
	return fs.readdirSync(directory, { withFileTypes: true })
		.sort((left, right) => left.name.localeCompare(right.name))
		.flatMap(entry => {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) return reviewFiles(entryPath);
			return entry.isFile() && entry.name.endsWith(".re") ? [entryPath] : [];
		});
}

const todos = [];

for (const file of reviewFiles(articlesDir)) {
	const relativePath = path.relative(process.cwd(), file).split(path.sep).join("/");
	const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
	lines.forEach((line, index) => {
		if (line.includes("TODO:")) {
			todos.push(`${relativePath}:${index + 1}: ${line.trim()}`);
		}
	});
}

if (todos.length === 0) {
	console.log("TODO check: no TODOs found in Re:VIEW manuscripts.");
} else {
	for (const todo of todos) console.warn(`WARN TODO ${todo}`);
	console.warn(`WARN TODO ${todos.length} TODO(s) remain in Re:VIEW manuscripts.`);
}
