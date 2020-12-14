
//var mutex = require( 'node-mutex' )();
const pjs = require('./battle.json');
const SocketServer = require('ws').Server;
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;

var pairing = [[]];
var player = 0;
var matches = 0;
var ka = "keep alive";
var aux1 = {

    id: 0,
    skills: pjs.skills[0],
    routes: pjs.routes.aimRight[0]

};
var aux2 = {

    id: 1,
    skills: pjs.skills[1],
    routes: pjs.routes.aimRight[0]

};

var server = app.listen(port, function () {

    console.log((new Date()) + " Server is listening on port "
    + port);

})

const wss = new SocketServer({ server }); //pairing = [[ws1, ws2], [ws3, ws4]]

wss.on('connection', function connection(ws, req) {
    
    console.log("New connection from " + req.connection.remoteAddress);
    /*mutex.lock('key', function(err, unlock){

        if (err) console.error( err );*/
        /*pairing[matches].push(ws);

        if(player){*/

            ws.send(JSON.stringify(
                
                {
                    msg: {
                        match: matches, //ID de la sesion
                        player: 2, //ID del pj seleccionado
                        miPj: aux2, //Datos del personaje del usuario
                        suPj: pjs.routes.aimLeft[1] //Sprite del personaje del contrincante
                    }
                
                }
                
            ));
            /*pairing[matches][0].send(JSON.stringify(
                
                {
                    msg: {
                        match: matches, 
                        player: 1, 
                        miPj: aux1, 
                        suPj: pjs.routes.aimLeft[1]
                    }
                
                }
                
            ));
            player--;
            matches++;
            pairing.push([])*/

        //}else player++;
       /* unlock();

    });*/
    ws.on('message', function(message){

        try{
         
            var msg = JSON.parse(message).msg;
            console.log(msg.jugador);
            pairing[msg.match][msg.jugador].send(JSON.stringify({msg:{move: msg.movimiento}}))
        
        }catch(e){

            console.log(e);
            console.log(message);

        }

    });
    ws.on('close', function(res){

        /*pairing.map(function(webs){

            if(webs.contains(ws))

        })*/
        console.log("Connection close");

    })
    
});

setInterval(() => {
    
    wss.clients.forEach((client) => {

        client.send(JSON.stringify({msg: ka}));

    });
    
}, 1000);