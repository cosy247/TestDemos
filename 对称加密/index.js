import * as CryptoJS from './node_modules/crypto-js/index.js';

console.log(CryptoJS);

// 定义密钥
const key = '1234567890123456'; // AES 密钥长度通常是 16、24 或 32 字节

// 加密
const plaintext = 'Hello, World!';
const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
console.log('加密后的数据:', ciphertext);

// 解密
const decrypted = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
console.log('解密后的数据:', decrypted);

const inputDom = document.querySelector('input');
const contentDom = document.querySelector('content');

inputDom.addEventListener('input', (event) => {
  console.log(event.target.value);
});
