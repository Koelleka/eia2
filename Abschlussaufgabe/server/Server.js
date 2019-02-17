"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Http = require("http");
var Url = require("url");
var CommandManager_1 = require("./CommandManager");
var PlayerManager_1 = require("./PlayerManager");
var LobbyManager_1 = require("./LobbyManager");
var CardManager_1 = require("./CardManager");
console.log("Server starting");
var port = process.env.PORT;
if (port == undefined)
    port = 8100;
var server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    var query = Url.parse(_request.url, true).query;
    var commandQuery = query["command"];
    var command = CommandManager_1.CommandManager.Instance.getCommand(commandQuery);
    if (command == null) {
        respond(_response, "command not found!");
    }
    console.log("command= " + commandQuery);
    var player;
    var lobby;
    var card;
    var game;
    var name = query["name"];
    var playerIdString = query["playerId"];
    if (playerIdString != null) {
        var playerId = parseInt(playerIdString);
        player = PlayerManager_1.PlayerManager.Instance.getPlayer(playerId);
        //        if ( player != null ) {
        //            console.log( "player= " + player.name );
        //        } else {
        //            console.log( "player not found= " + playerIdString );
        //        }
    }
    var lobbyIdString = query["lobbyId"];
    if (lobbyIdString != null) {
        var lobbyId = parseInt(lobbyIdString);
        lobby = LobbyManager_1.LobbyManager.Instance.getLobby(lobbyId);
        if (lobby != null) {
            game = lobby.game;
        }
    }
    //    if ( lobby != null && game != null ) {
    //        console.log( "game= " + game.id );
    //    } else if ( lobby != null && game == null ) {
    //        console.log( "game not found. lobbyid= " + lobby.id );
    //    }
    var cardIdString = query["cardId"];
    if (cardIdString != null) {
        var cardId = parseInt(cardIdString);
        card = CardManager_1.CardManager.Instance.getCard(cardId);
    }
    var result = command.execute(game, lobby, player, card, name);
    var json = JSON.stringify(result);
    respond(_response, json);
    // findCallback is an inner function so that _response is in scope
    function findCallback(json) {
        respond(_response, json);
    }
}
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//} 
//# sourceMappingURL=Server.js.map