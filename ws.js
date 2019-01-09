let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 3001});

wss.on("connection", function connection(ws){
  ws.on("message", function incoming(message){
       
      // wss.clients.forEach(client => {
      //   client.send(message) 
      // })

      // console.log(wss.clients)
      // console.log(wss.clients[0])
      // console.log(wss.clients[1])
      console.log(ws)
      wss.clients.forEach(function each(client) {
        if (client !== ws) {
          client.send(message);
        }
    })
  });
});