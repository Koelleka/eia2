namespace UnoClient {

    export class AjaxHelper {
        public static sendCommand( _command: Command ): void {
            console.log( "send command" );

            if ( Lobby.currentLobby != null )
                _command.lobbyId = Lobby.currentLobby.id;

            if ( Game.currentGame != null )
                _command.gameId = Game.currentGame.id;

            if ( Player.currentPlayer != null )
                _command.playerId = Player.currentPlayer.id;

            this.sendRequestWithCustomData( _command );
        }

        // Code von SendData umgeschrieben
        private static sendRequestWithCustomData( _command: Command ): void {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            var requestString: string = "http://localhost:8100?command=" + _command.command;
            requestString += "&cardId=" + _command.cardId;
            requestString += "&gameId=" + _command.gameId;
            requestString += "&lobbyId=" + _command.lobbyId;
            requestString += "&playerId=" + _command.playerId;
            requestString += "&name=" + _command.name;

            console.log( "send request: " + requestString );

            xhr.open( "GET", requestString, true );
            xhr.addEventListener( "readystatechange", this.handleStateChange );
            xhr.send();
        }

        private static handleStateChange( _event: ProgressEvent ): void {
            var xhr: XMLHttpRequest = ( <XMLHttpRequest>_event.target );
            if ( xhr.readyState == XMLHttpRequest.DONE ) {
                console.log( "ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText );
                console.log( "response: " + xhr.response );

                var response: string = xhr.responseText;
                if ( response == null || response == "" ) {
                    alert( "communication error. No response" );
                    return;
                }
                var clientEvent: ClientEvent = JSON.parse( response );
                var ev: CustomEvent = new CustomEvent( clientEvent.type, {
                    detail: clientEvent
                } );
                document.dispatchEvent( ev );
            }
        }
    }
}