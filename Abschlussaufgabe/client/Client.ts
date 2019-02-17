namespace UnoClient {

    document.addEventListener( "DOMContentLoaded", start );

    function start(): void {
        console.log( "client started" );

        console.log( "init eventlistener" );
        ( <HTMLButtonElement>document.getElementById( "createPlayerButton" ) ).addEventListener( "click", createPlayer );
        ( <HTMLButtonElement>document.getElementById( "reloadLobbiesButton" ) ).addEventListener( "click", getLobbies );
        ( <HTMLButtonElement>document.getElementById( "selectLobbyButton" ) ).addEventListener( "click", joinLobby );
        ( <HTMLButtonElement>document.getElementById( "createLobbyButton" ) ).addEventListener( "click", createLobby );
        ( <HTMLButtonElement>document.getElementById( "leaveLobbyButton" ) ).addEventListener( "click", leaveLobby );
        ( <HTMLButtonElement>document.getElementById( "startGameButton" ) ).addEventListener( "click", beReady );

        document.getElementById( "deck" ).addEventListener( "click", mouseClickOnDeck );
        //document.addEventListener( "keydown", spaceKeyPressed );

        document.addEventListener( "createPlayer", createPlayerEventHandler );
        document.addEventListener( "playCard", playCardEventHandler );
        document.addEventListener( "pickCard", pickCardEventHandler );
        document.addEventListener( "createLobby", createLobbyEventHandler );
        document.addEventListener( "getLobbies", getLobbiesEventHandler );
        document.addEventListener( "getLobbyPlayers", getLobbyPlayersEventHandler );
        document.addEventListener( "joinLobby", joinLobbyEventHandler );
        document.addEventListener( "leaveLobby", leaveLobbyEventHandler );
        document.addEventListener( "ready", readyEventHandler );
        document.addEventListener( "startGame", startEventHandler );
        document.addEventListener( "getGameState", getGameStateHandler );
    }

    function mouseClickOnDeck( _event: MouseEvent ): void {
        pickCard();
    }

    function spaceKeyPressed( _event: KeyboardEvent ): void {
        var keyCode: number = _event.keyCode;
        if ( keyCode == 32 ) {
            pickCard();
        }
    }

    function createPlayer(): void {
        var element: HTMLInputElement = <HTMLInputElement>document.getElementById( "createPlayerInput" );
        var playerName: string = element.value;
        var command: Command = new Command();
        command.command = "createPlayer";
        command.name = playerName;
        AjaxHelper.sendCommand( command );

        var button: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "createPlayerInput" );
        button.disabled = true;
    }

    function createPlayerEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var button: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "createPlayerInput" );
        button.disabled = false;

        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.player != null ) {
            Player.currentPlayer = clientEvent.player;
            var element: HTMLElement = <HTMLElement>document.getElementById( "createPlayerDiv" );
            element.hidden = true;

            element = <HTMLElement>document.getElementById( "lobbyOverviewDiv" );
            element.hidden = false;
            getLobbies();
        }
        else {
            alert( "Es ist ein Fehler aufgetreten" );
        }
    }

    function playCard( _id: number ): void {
        var command: Command = new Command();
        command.command = "playCard";
        command.cardId = _id;
        AjaxHelper.sendCommand( command );
    }

    function playCardEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var event: ClientEvent = <ClientEvent>_e.detail;
        if ( event.success ) {
            topCardZIndex++;
            var cardDiv: HTMLElement = <HTMLElement>document.getElementById( event.card.id + "" );
            cardDiv.removeEventListener( "click", mouseClickOnMyCard );
        }
    }

    function pickCard(): void {
        var command: Command = new Command();
        command.command = "pickCard";
        AjaxHelper.sendCommand( command );
    }

    function pickCardEventHandler( _e: CustomEvent ): void {
        console.log( _e );
    }

    function createLobby(): void {
        var element: HTMLInputElement = <HTMLInputElement>document.getElementById( "createLobbyInput" );
        var lobbyName: string = element.value;
        var command: Command = new Command();
        command.command = "createLobby";
        command.name = lobbyName;
        AjaxHelper.sendCommand( command );
    }

    function createLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.lobby != null ) {
            Lobby.currentLobby = clientEvent.lobby;

            var element: HTMLElement = <HTMLElement>document.getElementById( "lobbyOverviewDiv" );
            element.hidden = true;

            element = <HTMLElement>document.getElementById( "lobbyDiv" );
            element.hidden = false;
        } else {
            alert( "Es ist ein Fehler aufgetreten" );
        }
    }

    function joinLobby(): void {

        var element: HTMLSelectElement = <HTMLSelectElement>document.getElementById( "lobbyList" );
        var lobbyIdString: string = element.value;
        var lobbyId: number = parseInt( lobbyIdString );
        var command: Command = new Command();
        command.command = "joinLobby";
        command.lobbyId = lobbyId;
        AjaxHelper.sendCommand( command );

        // Button disablen
    }

    function joinLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.lobby != null ) {
            Lobby.currentLobby = clientEvent.lobby;

            var element: HTMLElement = <HTMLElement>document.getElementById( "lobbyOverviewDiv" );
            element.hidden = true;

            element = <HTMLElement>document.getElementById( "lobbyDiv" );
            element.hidden = false;
        }
    }

    function leaveLobby(): void {
        var lobby: Lobby = Lobby.currentLobby;
        var command: Command = new Command();
        command.command = "leaveLobby";
        command.lobbyId = lobby.id;
        AjaxHelper.sendCommand( command );

        // TODO button disablen
    }

    function leaveLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            Lobby.currentLobby = null;
        }

        var element: HTMLElement = <HTMLElement>document.getElementById( "lobbyOverviewDiv" );
        element.hidden = false;

        element = <HTMLElement>document.getElementById( "lobbyDiv" );
        element.hidden = true;
    }

    function getLobbies(): void {
        var command: Command = new Command();
        command.command = "getLobbies";
        AjaxHelper.sendCommand( command );
    }

    function getLobbiesEventHandler( _e: CustomEvent ): void {
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.lobbyList != null ) {
            var select: HTMLSelectElement = <HTMLSelectElement>document.getElementById( "lobbyList" );
            var length: number = select.options.length;
            for ( i = 0; i < length; i++ ) {
                select.options[i] = null;
            }

            for ( var i: number = 0; i < clientEvent.lobbyList.length; i++ ) {
                select.options[i] = new Option( clientEvent.lobbyList[i].name, clientEvent.lobbyList[i].id + "" );
            }
        }
    }


    function getLobbyPlayers( _lobby: Lobby ): void {
        var command: Command = new Command();
        command.command = "getLobbyPlayers";
        command.lobbyId = _lobby.id;
        AjaxHelper.sendCommand( command );
    }

    function getLobbyPlayersEventHandler( _e: CustomEvent ): void {
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            console.log( "getLobbyPlayers result" );
        }
    }

    function beReady(): void {
        var command: Command = new Command();
        command.command = "ready";
        AjaxHelper.sendCommand( command );
    }

    function readyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            console.log( "i'm ready wait for other players" );
            var element: HTMLElement = <HTMLElement>document.getElementById( "lobbyDiv" );
            element.hidden = true;

            element = <HTMLElement>document.getElementById( "waitDiv" );
            element.hidden = false;

            setTimeout(() => { beReady(); }, 1000 );
        }
    }

    function startEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            console.log( "all players ready let's go" );
        }

        var element: HTMLElement = <HTMLElement>document.getElementById( "lobbyDiv" );
        element.hidden = true;

        element = <HTMLElement>document.getElementById( "waitDiv" );
        element.hidden = true;

        element = <HTMLElement>document.getElementById( "gameDiv" );
        element.hidden = false;

        getGameState();
    }

    function getGameState(): void {
        var command: Command = new Command();
        command.command = "getGameState";
        AjaxHelper.sendCommand( command );
    }


    function getGameStateHandler( _e: CustomEvent ): void {
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            if ( !clientEvent.game.isGameOver ) {
                updateGameView( clientEvent.game );
                setTimeout(() => { getGameState(); }, 1000 );
            } else {
                var element: HTMLElement = <HTMLElement>document.getElementById( "gameDiv" );
                element.hidden = true;

                element = <HTMLElement>document.getElementById( "winnerDiv" );
                element.hidden = false;

                element = <HTMLElement>document.getElementById( "winnerSpan" );
                element.innerHTML = clientEvent.game.winner.name;
            }
        }
    }

    function updateGameView( _game: Game ): void {
        redrawCards();

        //        if ( _game.currentPlayer.isMe() ) {
        //            console.log( "it's my turn" );
        //        } 
    }

    function createCard( _card: Card ): HTMLDivElement {
        //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
        let cardDiv: HTMLDivElement = document.createElement( "div" ); //document, html element erstellen typ div
        cardDiv.className = "card";
        cardDiv.id = _card.id + "";

        // <div class="bg green"></div> 
        let bg: HTMLDivElement = document.createElement( "div" );
        bg.className = "bg " + _card.color;
        cardDiv.appendChild( bg ); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt

        // <div class="circle"></div> //Ellipse der Karte hinzufügen
        let kreis: HTMLDivElement = document.createElement( "div" );
        kreis.className = "circle";
        cardDiv.appendChild( kreis ); //fügt die Ellipse dieser einen Karte hinzu 

        //  <div class="top-left">9</div> 
        let obenLinks: HTMLDivElement = document.createElement( "div" );
        obenLinks.className = "top-left";
        obenLinks.innerHTML = _card.type; //was kommt auf diese karte drauf idF Zahl
        cardDiv.appendChild( obenLinks ); //fügt die zahl oben links dieser Karte hinzu

        //  <div class="center">9</div> 
        let zentrum: HTMLDivElement = document.createElement( "div" );
        zentrum.className = "center";
        zentrum.innerHTML = _card.type; //was kommt auf diese Karte idF die Zahl zentriert
        cardDiv.appendChild( zentrum ); //fügt die Zahl zentriert dieser Karte hinzu

        // <div class="bottom-right">9</div> 
        let untenRechts: HTMLDivElement = document.createElement( "div" );
        untenRechts.className = "bottom-right";
        untenRechts.innerHTML = _card.type;
        cardDiv.appendChild( untenRechts );

        return cardDiv;
    }

    function redrawCards(): void {

        var myCards: HTMLCollectionOf<Element> = document.getElementsByClassName( "myCard" );
        for ( var i: number = 0; i < myCards.length; i++ ) {
            var myCard: Element = myCards[i];
            myCard.remove();
        }

        var gameDiv: HTMLElement = <HTMLElement>document.getElementById( "gameDiv" );

        var otherOpponentCount: number = 0;
        for ( i = 0; i < Game.currentGame.players.length; i++ ) {
            var player: Player = Game.currentGame.players[i];

            if ( player.isMe() ) {
                for ( var j: number = 0; j < player.cards.length; j++ ) {
                    let card: Card = player.cards[j];
                    let cardDiv: HTMLElement = document.getElementById( card.id + "" );
                    if ( cardDiv == null ) {
                        cardDiv = createCard( card );
                        cardDiv.classList.add( "myCard" );

                        gameDiv.appendChild( cardDiv );
                    }

                    let style: CSSStyleDeclaration = cardDiv.style;
                    style.left = 10 + j * 80 + "px";
                    style.bottom = "10px";
                    style.zIndex = ( j + 1 ) + "";

                    cardDiv.removeEventListener( "click", mouseClickOnMyCard );
                    cardDiv.addEventListener( "click", mouseClickOnMyCard );
                }
            } else {
                var element: HTMLElement = <HTMLElement>document.getElementById( "otherPlayerName" + otherOpponentCount );
                element.innerText = player.name + ": ";

                element = <HTMLElement>document.getElementById( "otherPlayerCards" + otherOpponentCount );
                element.innerText = player.cards.length + " Karten";
                otherOpponentCount++;
            }
        }

        var topCardDiv: HTMLElement = <HTMLElement>document.getElementById( Game.currentGame.topCard.id + "" );
        if ( topCardDiv == null ) {
            topCardDiv = createCard( Game.currentGame.topCard );
            gameDiv.appendChild( topCardDiv );
        }

        let style: CSSStyleDeclaration = topCardDiv.style;
        style.left = "10px";
        style.top = "10px";
        style.zIndex = topCardZIndex + "";
    }

    var topCardZIndex: number = 1;

    function mouseClickOnMyCard( _event: MouseEvent ): void {
        let divCard: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = divCard.id;
        var cardId: number = parseInt( id );
        playCard( cardId );
    }
}
