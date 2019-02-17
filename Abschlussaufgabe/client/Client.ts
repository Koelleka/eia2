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

        document.addEventListener( "createPlayer", createPlayerEventHandler );
        document.addEventListener( "playCard", playCardEventHandler );
        document.addEventListener( "pickCard", pickCardEventHandler );
        document.addEventListener( "createLobby", createLobbyEventHandler );
        document.addEventListener( "getLobbies", getLobbiesEventHandler );
        document.addEventListener( "getLobbyPlayers", getLobbyPlayersEventHandler );
        document.addEventListener( "joinLobby", joinLobbyEventHandler );
        document.addEventListener( "leaveLobby", leaveLobbyEventHandler );
        document.addEventListener( "ready", readyEventHandler );
        document.addEventListener( "start", startEventHandler );
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

    function playCard( _card: Card ): void {
        var command: Command = new Command();
        command.command = "playCard";
        command.cardId = _card.id;
        AjaxHelper.sendCommand( command );
    }

    function playCardEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var event: ClientEvent = <ClientEvent>_e.detail;
        // TODO Player X spielt Karte Y
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
        // TODO view
    }
}
