import * as Http from "http";
import * as Url from "url";

namespace UnoServer {

    console.log( "Server starting" );

    let port: number = process.env.PORT;
    if ( port == undefined )
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener( "listening", handleListen );
    server.addListener( "request", handleRequest );
    server.listen( port );

    function handleListen(): void {
        console.log( "Listening on port: " + port );
    }

    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        console.log( "Request received" );

        let query: AssocStringString = Url.parse( _request.url, true ).query;
        var commandQuery: string = query["command"];

        var command: Command = CommandManager.Instance.getCommand( commandQuery );
        if ( command == null ) {
            respond( _response, "command not found!" );
        }

        var player: Player;
        var lobby: Lobby;
        var card: Card;
        var game: Game;
        var name: string = query["name"];

        var playerIdString: string = query["gameId"];
        if ( playerIdString != null ) {
            var playerId: number = parseInt( playerIdString );
            player = PlayerManager.Instance.getPlayer( playerId );
        }

        var lobbyIdString: string = query["lobbyId"];
        if ( lobbyIdString != null ) {
            var lobbyId: number = parseInt( lobbyIdString );
            lobby = LobbyManager.Instance.getLobby( lobbyId );
            if ( lobby != null ) {
                game = lobby.game;
            }
        }

        var cardIdString: string = query["cardId"];
        if ( cardIdString != null ) {
            var cardId: number = parseInt( cardIdString );
            // TODO card manager
        }

        command.execute( game, lobby, player, card, name );

        // findCallback is an inner function so that _response is in scope
        function findCallback( json: string ): void {
            respond( _response, json );
        }
    }

    function respond( _response: Http.ServerResponse, _text: string ): void {
        //console.log("Preparing response: " + _text);
        _response.setHeader( "Access-Control-Allow-Origin", "*" );
        _response.setHeader( "content-type", "text/html; charset=utf-8" );
        _response.write( _text );
        _response.end();
    }
}