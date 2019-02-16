var UnoClient;
(function (UnoClient) {
    document.addEventListener("DOMContentLoaded", start);
    function start() {
        console.log("client started");
        console.log("init eventlistener");
        document.getElementById("createPlayerButton").addEventListener("click", createPlayer);
        document.addEventListener("createPlayer", createPlayerEventHandler);
        document.addEventListener("playCard", playCardEventHandler);
        document.addEventListener("pickCard", pickCardEventHandler);
        document.addEventListener("createLobby", createLobbyEventHandler);
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
            UnoClient.Lobby.currentLobby = clientEvent.lobby;
            var element = document.getElementById("createPlayerDiv");
            element.hidden = true;
            element = document.getElementById("lobbyOverviewDiv");
            element.hidden = false;
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
    }
    function pickCard() {
        var command = new UnoClient.Command();
        command.command = "pickCard";
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function pickCardEventHandler(_e) {
        console.log(_e);
    }
    function createLobby(_name) {
        var command = new UnoClient.Command();
        command.command = "createLobby";
        command.name = _name;
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function createLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.lobby != null) {
            UnoClient.Lobby.currentLobby = clientEvent.lobby;
        }
        // TODO View abändern als Host
    }
    function joinLobby(_lobby) {
        var command = new UnoClient.Command();
        command.command = "joinLobby";
        command.lobbyId = _lobby.id;
        UnoClient.AjaxHelper.sendCommand(command);
        // Button disablen
    }
    function joinLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success && clientEvent.lobby != null) {
            UnoClient.Lobby.currentLobby = clientEvent.lobby;
        }
        // TODO View abändern
    }
    function leaveLobby(_lobby) {
        var command = new UnoClient.Command();
        command.command = "leaveLobby";
        command.lobbyId = _lobby.id;
        UnoClient.AjaxHelper.sendCommand(command);
        // TODO button disablen
    }
    function leaveLobbyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            UnoClient.Lobby.currentLobby = null;
        }
        // TODO View abändern
    }
    function ready() {
        var command = new UnoClient.Command();
        command.command = "ready";
        UnoClient.AjaxHelper.sendCommand(command);
        // Button disablen
    }
    function readyEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            console.log("i'm ready wait for other players");
            // Hier vielleicht noch den ready status aller spieler updaten
        }
        // Es muss so lange Ready aufgerufen werden bis das start Event kommt
        setTimeout(() => { ready(); }, 1000);
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