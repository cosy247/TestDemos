const dgram = require('dgram');

// 创建一个UDP客户端
const client = dgram.createSocket('udp4');

// 客户端向服务器发送消息
const message = Buffer.from('你好，服务器！');
client.send(message, 0, message.length, 41234, '127.0.0.1', (err) => {
  if (err) {
    console.error('发送消息时出错:', err);
  } else {
    console.log('消息已发送到服务器');
  }
});

// 监听消息事件，接收服务器的响应
client.on('message', (msg, rinfo) => {
  console.log(`从 ${rinfo.address}:${rinfo.port} 收到响应: ${msg.toString()}`);
});

// 监听错误事件
client.on('error', (err) => {
  console.log(`客户端出错: ${err.stack}`);
  client.close();
});
