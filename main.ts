// One-Sentence Absurd Invention Pitch — entry program.
//
// Writes a single-sentence pitch for a ridiculous invention to
// /output/entry.txt. The pitch must satisfy the bounty gate: UTF-8 text,
// 1 to 220 characters, not only white space, exactly one sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 220;

// The pitch: a doormat that shames you into wiping your shoes by
// apologising to the floor on your behalf, in a wounded posh accent.
const ENTRY =
  "A doormat that, the moment you track mud inside, apologizes to the floor in such a posh, wounded accent that you wipe your shoes just to end its suffering.";

function validate(text: string): void {
  if (text.length === 0 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line, no line breaks");
  }
  // Exactly one sentence: a single terminal full stop, no other
  // sentence-ending punctuation inside the text.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !text.trimEnd().endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  validate(ENTRY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_PATH}`);
  console.log(ENTRY);
}

main();
