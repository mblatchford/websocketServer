let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 3001});
const WebSocket = require('ws');
let uuid = require('uuid/v4');

let pendingMatch = [];
let arrOfRooms = [];
class rooms{
    constructor(id, players){
      this.id = id;
      this.players = players
    }
}

wss.on("connection", function connection(ws){
    console.log("Connection made to server")
    // on each connection add to pendingMatch array
    pendingMatch.push(ws)
    // for every two connections generate a room and reinitialize the pendingMatch arr
    if (pendingMatch.length == 2){
    console.log("pair connected")
    let generatedRoom = new rooms(uuid(), pendingMatch);
    arrOfRooms.push(generatedRoom)
    pendingMatch = [];
    console.log(arrOfRooms.length)//num of rooms present
      generatedRoom.players[0].send(JSON.stringify({type: 'roomInit', roomId: generatedRoom.id, turn: true}))
      generatedRoom.players[1].send(JSON.stringify({type: 'roomInit', roomId: generatedRoom.id, turn: false}))
    }
  ws.on("message", function incoming(message){
    parsedMessage = JSON.parse(message)
    console.log(parsedMessage)
    let filteredRooms = arrOfRooms.filter(roomObj => {
        if (roomObj.id === parsedMessage.id){
          return true;
        }else{
          return false;
        }
      })
      console.log('filteredRooms')
      console.log(filteredRooms)
      filteredRooms[0].players.forEach(function each(player) {
      if (player !== ws && player.readyState === WebSocket.OPEN) {
        player.send(JSON.stringify(parsedMessage));
      }
    });
  });
});