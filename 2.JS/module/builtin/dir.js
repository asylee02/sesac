const fs = require('fs');
const path = require('path');

function displayTree(directoryPath, indent = '', isLast = true) {
  const files = fs.readdirSync(directoryPath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    const isDirectory = stats.isDirectory();
    const isLastFile = i === files.length - 1;

    const prefix = isLastFile ? '└── ' : '├── ';
    const treeSymbol = isDirectory ? (isLastFile ? '    ' : '│   ') : '';

    console.log(indent + prefix + (isDirectory ? file + '/' : file));

    if (isDirectory) {
      const newIndent = indent + (isLastFile ? '    ' : '│   ');
      displayTree(filePath, newIndent, isLastFile);
    }
  }
}

const directoryPath = '../../'; // 원하는 디렉토리 경로로 변경

console.log(directoryPath);
displayTree(directoryPath);
