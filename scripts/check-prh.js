"use strict";

const fs = require("fs");
const path = require("path");
const prh = require("prh");

const repositoryRoot = path.resolve(__dirname, "..");
const articlesDir = path.join(repositoryRoot, "articles");
const rulesPath = path.join(articlesDir, "prh.yml");

function reviewFiles(directory) {
	return fs.readdirSync(directory, { withFileTypes: true })
		.sort((left, right) => left.name.localeCompare(right.name))
		.flatMap(entry => {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) return reviewFiles(entryPath);
			return entry.isFile() && entry.name.endsWith(".re") ? [entryPath] : [];
		});
}

function replacement(diff) {
	return diff.expected.replace(/\$(\d+)/g, (placeholder, index) =>
		diff.matches[Number(index)] ?? placeholder
	);
}

function location(content, index) {
	const before = content.slice(0, index);
	const line = before.split("\n").length;
	const lastNewline = before.lastIndexOf("\n");
	return { line, column: index - lastNewline };
}

const engine = prh.fromYAMLFilePath(rulesPath);
const warnings = [];

for (const file of reviewFiles(articlesDir)) {
	const content = fs.readFileSync(file, "utf8");
	const relativePath = path.relative(repositoryRoot, file).split(path.sep).join("/");
	for (const diff of engine.makeChangeSet(file).diffs) {
		const actual = diff.matches[0];
		const expected = replacement(diff);
		if (actual === expected) continue;
		const { line, column } = location(content, diff.index);
		const detail = diff.rule.raw.prh ? ` ${diff.rule.raw.prh}` : "";
		warnings.push(`⚠ WARN ${relativePath}:${line}:${column}: 「${actual}」→「${expected}」${detail}`);
	}
}

if (warnings.length === 0) {
	console.log("prh check: no issues found in Re:VIEW manuscripts.");
} else {
	for (const warning of warnings) console.warn(warning);
	console.warn(`⚠ WARN prh: ${warnings.length} issue(s) found in Re:VIEW manuscripts.`);
}
