var UnoClient;
(function (UnoClient) {
    var AjaxHelper = (function () {
        function AjaxHelper() {
        }
        AjaxHelper.sendCommand = function (_command) {
            //console.log( "send command= " + _command.command );
            if (UnoClient.Lobby.currentLobby != null) {
                _command.lobbyId = UnoClient.Lobby.currentLobby.id;
                //console.log( "lobbyid=" + Lobby.currentLobby.id );
            }
            if (UnoClient.Game.currentGame != null) {
                _command.gameId = UnoClient.Game.currentGame.id;
                //console.log( "gameId=" + Game.currentGame.id );
            }
            if (UnoClient.Player.currentPlayer != null) {
                _command.playerId = UnoClient.Player.currentPlayer.id;
                //console.log( "playerId=" + Player.currentPlayer.id );
            }
            this.sendRequestWithCustomData(_command);
        };
        // Code von SendData umgeschrieben
        AjaxHelper.sendRequestWithCustomData = function (_command) {
            var xhr = new XMLHttpRequest();
            var requestString = "https://eia2db.herokuapp.com?command=" + _command.command;
            requestString += "&cardId=" + _command.cardId;
            requestString += "&gameId=" + _command.gameId;
            requestString += "&lobbyId=" + _command.lobbyId;
            requestString += "&playerId=" + _command.playerId;
            requestString += "&name=" + _command.name;
            //console.log( "send request: " + requestString );
            xhr.open("GET", requestString, true);
            xhr.addEventListener("readystatechange", this.handleStateChange);
            xhr.send();
        };
        AjaxHelper.handleStateChange = function (_event) {
            var xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //console.log( "ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText );
                //console.log( "response: " + xhr.response );
                var response = xhr.responseText;
                if (response == null || response == "") {
                    alert("communication error. No response");
                    return;
                }
                // https://stackoverflow.com/a/35959710
                var clientEvent = new UnoClient.ClientEvent();
                clientEvent = Object.assign(clientEvent, JSON.parse(response));
                if (clientEvent.game != null) {
                    clientEvent.game = Object.assign(new UnoClient.Game(), clientEvent.game);
                    if (clientEvent.game.currentPlayer != null) {
                        clientEvent.game.currentPlayer = Object.assign(new UnoClient.Player(), clientEvent.game.currentPlayer);
                    }
                    if (clientEvent.game.winner != null) {
                        clientEvent.game.winner = Object.assign(new UnoClient.Player(), clientEvent.game.winner);
                    }
                    if (clientEvent.game.players != null) {
                        var players = [];
                        clientEvent.game.players = Object.assign(players, clientEvent.game.players);
                        for (var i = 0; i < clientEvent.game.players.length; i++) {
                            clientEvent.game.players[i] = Object.assign(new UnoClient.Player(), clientEvent.game.players[i]);
                        }
                    }
                    if (clientEvent.game.topCard != null) {
                        clientEvent.game.topCard = Object.assign(new UnoClient.Card(), clientEvent.game.topCard);
                    }
                    UnoClient.Game.currentGame = clientEvent.game;
                }
                if (clientEvent.player != null) {
                    clientEvent.player = Object.assign(new UnoClient.Player(), clientEvent.player);
                }
                var ev = new CustomEvent(clientEvent.type, {
                    detail: clientEvent
                });
                document.dispatchEvent(ev);
            }
        };
        return AjaxHelper;
    }());
    UnoClient.AjaxHelper = AjaxHelper;
})(UnoClient || (UnoClient = {}));
//# sourceMappingURL=AjaxHelper.js.map