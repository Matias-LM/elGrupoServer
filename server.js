/*var WebSocket = require('ws');
var https = require('https');
var fs = require('fs');
//const express = require('express')
//const cors = require('cors')
//const app = express()
const port = process.env.PORT || 4000
// list of currently connected clients (users)
var clients = [ ];
var playerId = null;
var playerCount = 0;
//app.use(cors())
/**
 * Helper function for escaping input strings
 *//*
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
const waitMatch = async function(){
    setTimeout(function(){
        console.log('yo');
        return "version 1";
    }, 2000);
    console.log('ayo');
}
const server = https.createServer({
    cert: fs.readFileSync('./cert.pem'),
    key: fs.readFileSync('./key.pem')
  });
const wss = new WebSocket.Server({ server });
//funk?
wss.on('connection', function(ws) {
    console.log('new client')
    console.log('new client');
    ws.send('something');
    /*console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    for (var i=0; i < clients.length; i++) {
        console.log('estoy')
        clients[i].sendUTF(JSON.stringify({lol: 'client connected'}));
    }
    //app.listen(port, () => console.log('server started on port', port))
    connection.on('close', function(connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");      // remove user from the list of connected clients
        clients.splice(index, 1);
    });*/
  /*  
});
server.listen(port, function() {
    console.log((new Date()) + " Server is listening on port "
    + port);
});
*/
const SocketServer = require('ws').Server;
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;

var pairing = [[]];
var player = 0;
var matches = 0;

app.get('/', function(req, res) {
    res.json({algo: 'lol'});
});

var server = app.listen(port, function () {

    console.log((new Date()) + " Server is listening on port "
    + port);

})
const wss = new SocketServer({ server });

wss.on('connection', function connection(ws) {
    
    console.log(ws);

});

setInterval(() => {
    
    wss.clients.forEach((client) => {

      client.send("keep alive");

    });
    
}, 1000);
