const fs = require('fs');
const JSZip = require('jszip');
const { parseStringPromise } = require('xml2js');

async function convertRpToHtml(rpFilePath, outputHtmlPath) {
  // 读取 .rp 文件
  const rpFileBuffer = fs.readFileSync(rpFilePath);
  const zip = await JSZip.loadAsync(rpFileBuffer);

  // 假设我们需要解析名为 'document.xml' 的文件
  const xmlFile = zip.file('document.xml');
  if (!xmlFile) {
    throw new Error('document.xml not found in the .rp file');
  }

  // 读取 XML 文件内容
  const xmlContent = await xmlFile.async('string');

  // 解析 XML 文件
  const result = await parseStringPromise(xmlContent);
  const pages = result.document.pages.page; // 假设 XML 结构中有 pages 节点

  // 创建 HTML 文件内容
  let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Axure RP Export</title>
            <style>
                /* 添加一些基本样式 */
                body { font-family: Arial, sans-serif; }
                .page { margin: 20px; }
                .element { margin: 10px; }
            </style>
        </head>
        <body>
    `;

  // 遍历每个页面并生成 HTML
  pages.forEach((page) => {
    htmlContent += `<div class="page" id="${page.$.id}">
            <h2>${page.$.name}</h2>
        `;

    // 遍历页面中的元素
    const elements = page.elements.element || [];
    elements.forEach((element) => {
      htmlContent += `<div class="element" id="${element.$.id}">
                <h3>${element.$.name}</h3>
                <p>${element.$.description}</p>
            </div>`;
    });

    htmlContent += `</div>`;
  });

  htmlContent += `
        </body>
        </html>
    `;

  // 将生成的 HTML 写入文件
  fs.writeFileSync(outputHtmlPath, htmlContent);
  console.log(`HTML 文件已生成：${outputHtmlPath}`);
}

// 调用函数
const rpFilePath = './temp.rp';
const outputHtmlPath = 'output.html';
convertRpToHtml(rpFilePath, outputHtmlPath);
