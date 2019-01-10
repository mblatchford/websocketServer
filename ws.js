let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 3001});
const WebSocket = require('ws');
let uuid = require('uuid/v4');

let pendingMatch = [];
let arrOfRooms = [];
class rooms{
    constructor(id, p1, p2){
      this.id = id;
      this.p1 = p1;
      this.p2 = p2;
    }
}

wss.on("connection", function connection(ws){
    console.log("Connection made to server")
    // on each connection add to pendingMatch array
    pendingMatch.push(ws)
    // for every two connections generate a room and reinitialize the pendingMatch arr
    if (pendingMatch.length == 2){
    console.log("pair connected")
    let generateRoom = new rooms(uuid(), pendingMatch[0], pendingMatch[1]);
    arrOfRooms.push(generateRoom)
    pendingMatch = [];
    console.log(arrOfRooms.length)//num of rooms present
    }
  ws.on("message", function incoming(message){
       
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});