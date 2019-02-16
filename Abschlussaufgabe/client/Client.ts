namespace UnoClient {

    document.addEventListener( "DOMContentLoaded", start );

    function start(): void {
        console.log( "client started" );

        console.log( "init eventlistener" );
        ( <HTMLButtonElement>document.getElementById( "createPlayerButton" ) ).addEventListener( "click", createPlayer );

        document.addEventListener( "createPlayer", createPlayerEventHandler );
        document.addEventListener( "playCard", playCardEventHandler );
        document.addEventListener( "pickCard", pickCardEventHandler );
        document.addEventListener( "createLobby", createLobbyEventHandler );
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
            Lobby.currentLobby = clientEvent.lobby;
            var element: HTMLElement = <HTMLElement>document.getElementById( "createPlayerDiv" );
            element.hidden = true;

            element = <HTMLElement>document.getElementById( "lobbyOverviewDiv" );
            element.hidden = false;
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
    }

    function pickCard(): void {
        var command: Command = new Command();
        command.command = "pickCard";
        AjaxHelper.sendCommand( command );
    }

    function pickCardEventHandler( _e: CustomEvent ): void {
        console.log( _e );
    }

    function createLobby( _name: string ): void {
        var command: Command = new Command();
        command.command = "createLobby";
        command.name = _name;
        AjaxHelper.sendCommand( command );
    }

    function createLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.lobby != null ) {
            Lobby.currentLobby = clientEvent.lobby;
        }
        // TODO View abändern als Host
    }

    function joinLobby( _lobby: Lobby ): void {
        var command: Command = new Command();
        command.command = "joinLobby";
        command.lobbyId = _lobby.id;
        AjaxHelper.sendCommand( command );

        // Button disablen
    }

    function joinLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success && clientEvent.lobby != null ) {
            Lobby.currentLobby = clientEvent.lobby;
        }
        // TODO View abändern
    }

    function leaveLobby( _lobby: Lobby ): void {
        var command: Command = new Command();
        command.command = "leaveLobby";
        command.lobbyId = _lobby.id;
        AjaxHelper.sendCommand( command );

        // TODO button disablen
    }

    function leaveLobbyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            Lobby.currentLobby = null;
        }

        // TODO View abändern
    }

    function ready(): void {
        var command: Command = new Command();
        command.command = "ready";
        AjaxHelper.sendCommand( command );

        // Button disablen
    }

    function readyEventHandler( _e: CustomEvent ): void {
        console.log( _e );
        var clientEvent: ClientEvent = <ClientEvent>_e.detail;
        if ( clientEvent.success ) {
            console.log( "i'm ready wait for other players" );
            // Hier vielleicht noch den ready status aller spieler updaten
        }
        // Es muss so lange Ready aufgerufen werden bis das start Event kommt
        setTimeout(() => { ready(); }, 1000 );
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
