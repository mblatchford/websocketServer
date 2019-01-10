let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 3001});
const WebSocket = require('ws');


wss.on("connection", function connection(ws){
  console.log("client connected")
  ws.on("message", function incoming(message){
       
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});