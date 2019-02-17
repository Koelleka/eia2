namespace UnoClient {

    export class AjaxHelper {
        public static sendCommand( _command: Command ): void {
            //console.log( "send command= " + _command.command );

            if ( Lobby.currentLobby != null ) {
                _command.lobbyId = Lobby.currentLobby.id;
                //console.log( "lobbyid=" + Lobby.currentLobby.id );
            }


            if ( Game.currentGame != null ) {
                _command.gameId = Game.currentGame.id;
                //console.log( "gameId=" + Game.currentGame.id );
            }


            if ( Player.currentPlayer != null ) {
                _command.playerId = Player.currentPlayer.id;
                //console.log( "playerId=" + Player.currentPlayer.id );
            }

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

            //console.log( "send request: " + requestString );

            xhr.open( "GET", requestString, true );
            xhr.addEventListener( "readystatechange", this.handleStateChange );
            xhr.send();
        }

        private static handleStateChange( _event: ProgressEvent ): void {
            var xhr: XMLHttpRequest = ( <XMLHttpRequest>_event.target );
            if ( xhr.readyState == XMLHttpRequest.DONE ) {
                //console.log( "ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText );
                //console.log( "response: " + xhr.response );

                var response: string = xhr.responseText;
                if ( response == null || response == "" ) {
                    alert( "communication error. No response" );
                    return;
                }
                // https://stackoverflow.com/a/35959710
                var clientEvent: ClientEvent = new ClientEvent();
                clientEvent = ( <any>Object ).assign( clientEvent, JSON.parse( response ) );

                if ( clientEvent.game != null ) {
                    clientEvent.game = ( <any>Object ).assign( new Game(), clientEvent.game );

                    if ( clientEvent.game.currentPlayer != null ) {
                        clientEvent.game.currentPlayer = ( <any>Object ).assign( new Player(), clientEvent.game.currentPlayer );
                    }

                    if ( clientEvent.game.winner != null ) {
                        clientEvent.game.winner = ( <any>Object ).assign( new Player(), clientEvent.game.winner );
                    }

                    if ( clientEvent.game.players != null ) {
                        var players: Player[] = [];
                        clientEvent.game.players = ( <any>Object ).assign( players, clientEvent.game.players );

                        for ( var i: number = 0; i < clientEvent.game.players.length; i++ ) {
                            clientEvent.game.players[i] = ( <any>Object ).assign( new Player(), clientEvent.game.players[i] );
                        }
                    }

                    if ( clientEvent.game.topCard != null ) {
                        clientEvent.game.topCard = ( <any>Object ).assign( new Card(), clientEvent.game.topCard );
                    }

                    Game.currentGame = clientEvent.game;
                }

                if ( clientEvent.player != null ) {
                    clientEvent.player = ( <any>Object ).assign( new Player(), clientEvent.player );
                }

                var ev: CustomEvent = new CustomEvent( clientEvent.type, {
                    detail: clientEvent
                } );

                document.dispatchEvent( ev );
            }
        }
    }
}