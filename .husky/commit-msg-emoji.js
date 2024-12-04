const { readFileSync, writeFileSync } = require('fs');

const typeToEmojiMap = {
  chore: '🎨',
  feat: '✨',
  fix: '🐛'
};

// 数组at方法：从前往后索引0到length-1，从右往左-1到-length,且不改变原数组
const COMMIT_EDITING_FILEPATH = process.argv.at(-1);

const inputMsg = readFileSync(COMMIT_EDITING_FILEPATH, 'utf8');

writeFileSync(COMMIT_EDITING_FILEPATH, transform(inputMsg, typeToEmojiMap), 'utf8');

function transform(inputMsg, typeToEmojiMap) {
  const [type, emoji] =
    Object.entries(typeToEmojiMap).find(([type]) => inputMsg.startsWith(type)) ?? [];

  if (type) {
    return inputMsg.replace(new RegExp(`^${type}`), `${emoji} $&`);
  }

  throw new Error('Invalid type');
}
