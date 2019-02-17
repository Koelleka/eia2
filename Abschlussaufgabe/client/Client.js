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
        document.getElementById("deck").addEventListener("click", mouseClickOnDeck);
        //document.addEventListener( "keydown", spaceKeyPressed );
        document.addEventListener("createPlayer", createPlayerEventHandler);
        document.addEventListener("playCard", playCardEventHandler);
        document.addEventListener("pickCard", pickCardEventHandler);
        document.addEventListener("createLobby", createLobbyEventHandler);
        document.addEventListener("getLobbies", getLobbiesEventHandler);
        document.addEventListener("getLobbyPlayers", getLobbyPlayersEventHandler);
        document.addEventListener("joinLobby", joinLobbyEventHandler);
        document.addEventListener("leaveLobby", leaveLobbyEventHandler);
        document.addEventListener("ready", readyEventHandler);
        document.addEventListener("startGame", startEventHandler);
        document.addEventListener("getGameState", getGameStateHandler);
    }
    function mouseClickOnDeck(_event) {
        pickCard();
    }
    function spaceKeyPressed(_event) {
        var keyCode = _event.keyCode;
        if (keyCode == 32) {
            pickCard();
        }
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
    function playCard(_id) {
        var command = new UnoClient.Command();
        command.command = "playCard";
        command.cardId = _id;
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function playCardEventHandler(_e) {
        console.log(_e);
        var event = _e.detail;
        if (event.success) {
            topCardZIndex++;
            var cardDiv = document.getElementById(event.card.id + "");
            cardDiv.removeEventListener("click", mouseClickOnMyCard);
        }
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
            setTimeout(function () { beReady(); }, 1000);
        }
    }
    function startEventHandler(_e) {
        console.log(_e);
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            console.log("all players ready let's go");
        }
        var element = document.getElementById("lobbyDiv");
        element.hidden = true;
        element = document.getElementById("waitDiv");
        element.hidden = true;
        element = document.getElementById("gameDiv");
        element.hidden = false;
        getGameState();
    }
    function getGameState() {
        var command = new UnoClient.Command();
        command.command = "getGameState";
        UnoClient.AjaxHelper.sendCommand(command);
    }
    function getGameStateHandler(_e) {
        var clientEvent = _e.detail;
        if (clientEvent.success) {
            if (!clientEvent.game.isGameOver) {
                updateGameView(clientEvent.game);
                setTimeout(function () { getGameState(); }, 1000);
            }
            else {
                var element = document.getElementById("gameDiv");
                element.hidden = true;
                element = document.getElementById("winnerDiv");
                element.hidden = false;
                element = document.getElementById("winnerSpan");
                element.innerHTML = clientEvent.game.winner.name;
            }
        }
    }
    function updateGameView(_game) {
        redrawCards();
        //        if ( _game.currentPlayer.isMe() ) {
        //            console.log( "it's my turn" );
        //        } 
    }
    function createCard(_card) {
        //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
        var cardDiv = document.createElement("div"); //document, html element erstellen typ div
        cardDiv.className = "card";
        cardDiv.id = _card.id + "";
        // <div class="bg green"></div> 
        var bg = document.createElement("div");
        bg.className = "bg " + _card.color;
        cardDiv.appendChild(bg); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt
        // <div class="circle"></div> //Ellipse der Karte hinzufügen
        var kreis = document.createElement("div");
        kreis.className = "circle";
        cardDiv.appendChild(kreis); //fügt die Ellipse dieser einen Karte hinzu 
        //  <div class="top-left">9</div> 
        var obenLinks = document.createElement("div");
        obenLinks.className = "top-left";
        obenLinks.innerHTML = _card.type; //was kommt auf diese karte drauf idF Zahl
        cardDiv.appendChild(obenLinks); //fügt die zahl oben links dieser Karte hinzu
        //  <div class="center">9</div> 
        var zentrum = document.createElement("div");
        zentrum.className = "center";
        zentrum.innerHTML = _card.type; //was kommt auf diese Karte idF die Zahl zentriert
        cardDiv.appendChild(zentrum); //fügt die Zahl zentriert dieser Karte hinzu
        // <div class="bottom-right">9</div> 
        var untenRechts = document.createElement("div");
        untenRechts.className = "bottom-right";
        untenRechts.innerHTML = _card.type;
        cardDiv.appendChild(untenRechts);
        return cardDiv;
    }
    function redrawCards() {
        var myCards = document.getElementsByClassName("myCard");
        for (var i = 0; i < myCards.length; i++) {
            var myCard = myCards[i];
            myCard.remove();
        }
        var gameDiv = document.getElementById("gameDiv");
        var otherOpponentCount = 0;
        for (i = 0; i < UnoClient.Game.currentGame.players.length; i++) {
            var player = UnoClient.Game.currentGame.players[i];
            if (player.isMe()) {
                for (var j = 0; j < player.cards.length; j++) {
                    var card = player.cards[j];
                    var cardDiv = document.getElementById(card.id + "");
                    if (cardDiv == null) {
                        cardDiv = createCard(card);
                        cardDiv.classList.add("myCard");
                        gameDiv.appendChild(cardDiv);
                    }
                    var style_1 = cardDiv.style;
                    style_1.left = 10 + j * 80 + "px";
                    style_1.bottom = "10px";
                    style_1.zIndex = (j + 1) + "";
                    cardDiv.removeEventListener("click", mouseClickOnMyCard);
                    cardDiv.addEventListener("click", mouseClickOnMyCard);
                }
            }
            else {
                var element = document.getElementById("otherPlayerName" + otherOpponentCount);
                element.innerText = player.name + ": ";
                element = document.getElementById("otherPlayerCards" + otherOpponentCount);
                element.innerText = player.cards.length + " Karten";
                otherOpponentCount++;
            }
        }
        var topCardDiv = document.getElementById(UnoClient.Game.currentGame.topCard.id + "");
        if (topCardDiv == null) {
            topCardDiv = createCard(UnoClient.Game.currentGame.topCard);
            gameDiv.appendChild(topCardDiv);
        }
        var style = topCardDiv.style;
        style.left = "10px";
        style.top = "10px";
        style.zIndex = topCardZIndex + "";
    }
    var topCardZIndex = 1;
    function mouseClickOnMyCard(_event) {
        var divCard = _event.currentTarget;
        var id = divCard.id;
        var cardId = parseInt(id);
        playCard(cardId);
    }
})(UnoClient || (UnoClient = {}));
//# sourceMappingURL=Client.js.map