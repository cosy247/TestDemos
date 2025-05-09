const dgram = require('dgram');

// 创建一个UDP服务器
const server = dgram.createSocket('udp4');

// 监听消息事件
server.on('message', (msg, rinfo) => {
  console.log(`从 ${rinfo.address}:${rinfo.port} 收到消息: ${msg.toString()}`);
  // 向客户端发送响应
  const response = Buffer.from('服务器已收到你的消息');
  server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error('发送响应时出错:', err);
    }
  });
});

// 监听错误事件
server.on('error', (err) => {
  console.log(`服务器出错: ${err.stack}`);
  server.close();
});

// 绑定端口
server.bind(41234, () => {
  const address = server.address();
  console.log(`UDP服务器正在监听 ${address.address}:${address.port}`);
});
