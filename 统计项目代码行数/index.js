import fs from 'fs';
import path from 'path';

// 定义要统计的文件夹路径（支持多个文件夹）
const folderPaths = ['./']; // 替换为你的文件夹路径数组

// 定义要忽略的文件夹名称（支持多个文件夹）
const ignoreFolders = ['node_modules', 'dist', 'build', 'out']; // 替换为需要忽略的文件夹名称数组

// 定义需要统计的文件后缀（支持多个后缀）
const fileExtensions = ['.js', '.css', '.vue']; // 替换为需要统计的文件后缀数组

// 用于统计代码行数的函数
function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').length;
  return lines;
}

// 递归遍历文件夹并统计代码行数
function countLinesInFolder(folderPath) {
  let totalLines = 0;

  // 读取文件夹内容
  const files = fs.readdirSync(folderPath, { withFileTypes: true });

  files.forEach((dirent) => {
    const filePath = path.join(folderPath, dirent.name);

    if (dirent.isDirectory()) {
      // 如果是文件夹，检查是否需要忽略
      if (ignoreFolders.includes(dirent.name)) {
        console.log(`Ignoring folder: ${filePath}`);
        return;
      }
      // 递归调用
      totalLines += countLinesInFolder(filePath);
    } else if (dirent.isFile()) {
      // 检查文件后缀是否在支持的列表中
      const fileExtension = path.extname(dirent.name);
      if (fileExtensions.includes(fileExtension)) {
        // 如果是支持的文件类型，统计行数并输出
        const lines = countLines(filePath);
        console.log(`${filePath}: ${lines} lines`);
        totalLines += lines;
      }
    }
  });

  return totalLines;
}

// 遍历所有文件夹并统计代码行数
let totalLines = 0;
folderPaths.forEach((folderPath) => {
  if (fs.existsSync(folderPath)) {
    totalLines += countLinesInFolder(folderPath);
  } else {
    console.log(`Folder does not exist: ${folderPath}`);
  }
});

// 输出总行数
console.log(`Total lines of code in ${fileExtensions.join(', ')} files: ${totalLines}`);
