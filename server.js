var webSocketServer = require('websocket').server;
var http = require('http');
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const port = process.env.PORT || 4000

// list of currently connected clients (users)
var clients = [ ];
var playerId = null;
var playerCount = 0;

app.use(cors())

/**
 * Helper function for escaping input strings
 */
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

const find = async function(){

    var resp = await waitMatch();
    return resp;

}

app.get('/api', (req, res) => {
  res.status(200).json({api: 'version 1'})

    var myId = playerCount;
    playerCount++;
    playerId = myId;
    do{

        console.log(playerId);

    }while(playerId == myId);
    console.log('Si');
    res.status(200).json({api: myId});

})

app.listen(port, () => console.log('server started on port', port))
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
});

var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
  });

server.listen(port, function() {

    console.log((new Date()) + " Server is listening on port "
    + port);

});

wsServer.on('request', function(request) {

    console.log((new Date()) + ' Connection from origin '
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

    });

});
