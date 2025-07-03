const fs = require('fs');
const path = require('path');

function getFoldersWithIndexHtml(folderPath) {
  const foldersWithIndexHtml = [];

  try {
    const items = fs.readdirSync(folderPath);

    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        // 检查一级子文件夹中是否存在 index.html
        const files = fs.readdirSync(itemPath);
        if (files.includes('index.html')) {
          foldersWithIndexHtml.push(itemPath);
        }
      }
    }
  } catch (err) {
    console.error('读取文件夹时发生错误：', err);
  }

  return foldersWithIndexHtml;
}

const jsContent = `const domeNames = ["${getFoldersWithIndexHtml('./').join('", "')}"];\nexport default domeNames;`
fs.writeFileSync('./domeNames.js', jsContent)
