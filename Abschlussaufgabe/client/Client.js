var UnoClient;
(function (UnoClient) {
    document.addEventListener("DOMContentLoaded", start);
    function start() {
        console.log("client started");
        console.log("init eventlistener");
        document.getElementById("createPlayerButton").addEventListener("click", createPlayer);
        document.getElementById("reloadLobbiesButton").addEventListener("click", getLobbies);
        document.getElementById("selectLobbyButton").addEventListener("click", joinLobby);
        document.getElementById("createLobbyButton").addEventListener("click", createLobby);
        document.getElementById("leaveLobbyButton").addEventListener("click", leaveLobby);
        document.getElementById("startGameButton").addEventListener("click", beReady);
        document.addEventListener("createPlayer", createPlayerEventHandler);
        document.addEventListener("playCard", playCardEventHandler);
        document.addEventListener("pickCard", pickCardEventHandler);
        document.addEventListener("createLobby", createLobbyEventHandler);
        document.addEventListener("getLobbies", getLobbiesEventHandler);
        document.addEventListener("getLobbyPlayers", getLobbyPlayersEventHandler);
        document.addEventListener("joinLobby", joinLobbyEventHandler);
        document.addEventListener("leaveLobby", leaveLobbyEventHandler);
        document.addEventListener("ready", readyEventHandler);
        document.addEventListener("start", startEventHandler);
    }
    function createPlayer() {
        var element = document.getElementById("createPlayerInput");
        var playerName = element.value;
        var command = new UnoClient.Command();
        command.command = "createPlayer";
        command.name = playerName;
        UnoClient.AjaxHelper.sendCommand(command);
        var button = document.getElementById("createPlayerInput");
        button.disabled = true;
    }
    function createPlayerEventHandler(_e) {
        console.log(_e);
        var button = document.getElementById("createPlayerInput");
        button.disabled = false;
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.player != null) {
            UnoClient.Player.currentPlayer = clientEvent.player;
            var element = document.getElementById("createPlayerDiv");
            element.hidden = true;
            element = document.getElementById("lobbyOverviewDiv");
            element.hidden = false;
            getLobbies();
        }
        else {
            alert("Es ist ein Fehler aufgetreten");
        }
    }
    function playCard(_card) {
        var command = new UnoClient.Command();
        command.command = "playCard";
        command.cardId = _card.id;
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function playCardEventHandler(_e) {
        console.log(_e);
        var event = _e.detail;
        // TODO Player X spielt Karte Y
    }
    function pickCard() {
        var command = new UnoClient.Command();
        command.command = "pickCard";
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function pickCardEventHandler(_e) {
        console.log(_e);
    }
    function createLobby() {
        var element = document.getElementById("createLobbyInput");
        var lobbyName = element.value;
        var command = new UnoClient.Command();
        command.command = "createLobby";
        command.name = lobbyName;
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function createLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.lobby != null) {
            UnoClient.Lobby.currentLobby = clientEvent.lobby;
            var element = document.getElementById("lobbyOverviewDiv");
            element.hidden = true;
            element = document.getElementById("lobbyDiv");
            element.hidden = false;
        }
        else {
            alert("Es ist ein Fehler aufgetreten");
        }
    }
    function joinLobby() {
        var element = document.getElementById("lobbyList");
        var lobbyIdString = element.value;
        var lobbyId = parseInt(lobbyIdString);
        var command = new UnoClient.Command();
        command.command = "joinLobby";
        command.lobbyId = lobbyId;
        UnoClient.AjaxHelper.sendCommand(command);
        // Button disablen
    }
    function joinLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.lobby != null) {
            UnoClient.Lobby.currentLobby = clientEvent.lobby;
            var element = document.getElementById("lobbyOverviewDiv");
            element.hidden = true;
            element = document.getElementById("lobbyDiv");
            element.hidden = false;
        }
    }
    function leaveLobby() {
        var lobby = UnoClient.Lobby.currentLobby;
        var command = new UnoClient.Command();
        command.command = "leaveLobby";
        command.lobbyId = lobby.id;
        UnoClient.AjaxHelper.sendCommand(command);
        // TODO button disablen
    }
    function leaveLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            UnoClient.Lobby.currentLobby = null;
        }
        var element = document.getElementById("lobbyOverviewDiv");
        element.hidden = false;
        element = document.getElementById("lobbyDiv");
        element.hidden = true;
    }
    function getLobbies() {
        var command = new UnoClient.Command();
        command.command = "getLobbies";
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function getLobbiesEventHandler(_e) {
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.lobbyList != null) {
            var select = document.getElementById("lobbyList");
            var length = select.options.length;
            for (i = 0; i < length; i++) {
                select.options[i] = null;
            }
            for (var i = 0; i < clientEvent.lobbyList.length; i++) {
                select.options[i] = new Option(clientEvent.lobbyList[i].name, clientEvent.lobbyList[i].id + "");
            }
        }
    }
    function getLobbyPlayers(_lobby) {
        var command = new UnoClient.Command();
        command.command = "getLobbyPlayers";
        command.lobbyId = _lobby.id;
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function getLobbyPlayersEventHandler(_e) {
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            console.log("getLobbyPlayers result");
        }
    }
    function beReady() {
        var command = new UnoClient.Command();
        command.command = "ready";
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function readyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            console.log("i'm ready wait for other players");
            var element = document.getElementById("lobbyDiv");
            element.hidden = true;
            element = document.getElementById("waitDiv");
            element.hidden = false;
            setTimeout(() => { beReady(); }, 1000);
        }
    }
    function startEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            console.log("all players ready let's go");
        }
        // TODO view
    }
})(UnoClient || (UnoClient = {}));
//# sourceMappingURL=Client.js.map