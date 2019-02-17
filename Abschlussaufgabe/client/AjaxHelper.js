var UnoClient;
(function (UnoClient) {
    class AjaxHelper {
        static sendCommand(_command) {
            console.log("send command= " + _command.command);
            if (UnoClient.Lobby.currentLobby != null) {
                _command.lobbyId = UnoClient.Lobby.currentLobby.id;
                console.log("lobbyid=" + UnoClient.Lobby.currentLobby.id);
            }
            if (UnoClient.Game.currentGame != null) {
                _command.gameId = UnoClient.Game.currentGame.id;
                console.log("gameId=" + UnoClient.Game.currentGame.id);
            }
            if (UnoClient.Player.currentPlayer != null) {
                _command.playerId = UnoClient.Player.currentPlayer.id;
                console.log("playerId=" + UnoClient.Player.currentPlayer.id);
            }
            this.sendRequestWithCustomData(_command);
        }
        // Code von SendData umgeschrieben
        static sendRequestWithCustomData(_command) {
            let xhr = new XMLHttpRequest();
            var requestString = "http://localhost:8100?command=" + _command.command;
            requestString += "&cardId=" + _command.cardId;
            requestString += "&gameId=" + _command.gameId;
            requestString += "&lobbyId=" + _command.lobbyId;
            requestString += "&playerId=" + _command.playerId;
            requestString += "&name=" + _command.name;
            console.log("send request: " + requestString);
            xhr.open("GET", requestString, true);
            xhr.addEventListener("readystatechange", this.handleStateChange);
            xhr.send();
        }
        static handleStateChange(_event) {
            var xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
                console.log("response: " + xhr.response);
                var response = xhr.responseText;
                if (response == null || response == "") {
                    alert("communication error. No response");
                    return;
                }
                var clientEvent = JSON.parse(response);
                var ev = new CustomEvent(clientEvent.type, {
                    detail: clientEvent
                });
                document.dispatchEvent(ev);
            }
        }
    }
    UnoClient.AjaxHelper = AjaxHelper;
})(UnoClient || (UnoClient = {}));
//# sourceMappingURL=AjaxHelper.js.map