const { readFileSync, writeFileSync } = require('fs');

const typeToEmojiMap = {
  chore: '🎨',
  feat: '✨',
  fix: '🐛'
};

const COMMIT_EDITING_FILEPATH = process.argv.at(-1);
console.log(process.argv, 'process.argv');

console.log(COMMIT_EDITING_FILEPATH, 'COMMIT_EDITING_FILEPATH');

const inputMsg = readFileSync(COMMIT_EDITING_FILEPATH, 'utf8');

writeFileSync(COMMIT_EDITING_FILEPATH, transform(inputMsg, typeToEmojiMap), 'utf8');

function transform(inputMsg, typeToEmojiMap) {
  console.log(inputMsg, 'inputMsg');

  const [type, emoji] =
    Object.entries(typeToEmojiMap).find(([type]) => inputMsg.startsWith(type)) ?? [];

  console.log(type, 'type');

  if (type) {
    return inputMsg.replace(new RegExp(`^${type}`), `${emoji} $&`);
  }

  throw new Error('Invalid type');
}
