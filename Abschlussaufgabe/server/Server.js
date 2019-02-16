"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
var UnoServer;
(function (UnoServer) {
    console.log("Server starting");
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("Listening on port: " + port);
    }
    function handleRequest(_request, _response) {
        console.log("Request received");
        let query = Url.parse(_request.url, true).query;
        var commandQuery = query["command"];
        var command = CommandManager.Instance.getCommand(commandQuery);
        if (command == null) {
            respond(_response, "command not found!");
        }
        var player;
        var lobby;
        var card;
        var game;
        var name = query["name"];
        var playerIdString = query["gameId"];
        if (playerIdString != null) {
            var playerId = parseInt(playerIdString);
            player = PlayerManager.Instance.getPlayer(playerId);
        }
        var lobbyIdString = query["lobbyId"];
        if (lobbyIdString != null) {
            var lobbyId = parseInt(lobbyIdString);
            lobby = LobbyManager.Instance.getLobby(lobbyId);
            if (lobby != null) {
                game = lobby.game;
            }
        }
        var cardIdString = query["cardId"];
        if (cardIdString != null) {
            var cardId = parseInt(cardIdString);
            // TODO card manager
        }
        command.execute(game, lobby, player, card, name);
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
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=Server.js.map