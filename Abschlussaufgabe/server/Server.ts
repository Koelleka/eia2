import * as Http from "http";
import * as Url from "url";
import { Command } from "./Command";
import { CommandManager } from "./CommandManager";
import { Player } from "./Player";
import { Lobby } from "./Lobby";
import { Game } from "./Game";
import { GameCard } from "./CardManager";
import { PlayerManager } from "./PlayerManager";
import { LobbyManager } from "./LobbyManager";
import { CardManager } from "./CardManager";
import { ServerEvent } from "./ServerEvent";

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
    console.log( "command= " + commandQuery );

    var player: Player;
    var lobby: Lobby;
    var card: GameCard;
    var game: Game;
    var name: string = query["name"];

    var playerIdString: string = query["playerId"];
    if ( playerIdString != null ) {
        var playerId: number = parseInt( playerIdString );
        player = PlayerManager.Instance.getPlayer( playerId );
        //        if ( player != null ) {
        //            console.log( "player= " + player.name );
        //        } else {
        //            console.log( "player not found= " + playerIdString );
        //        }
    }

    var lobbyIdString: string = query["lobbyId"];
    if ( lobbyIdString != null ) {
        var lobbyId: number = parseInt( lobbyIdString );
        lobby = LobbyManager.Instance.getLobby( lobbyId );
        if ( lobby != null ) {
            game = lobby.game;
        }
    }

    //    if ( lobby != null && game != null ) {
    //        console.log( "game= " + game.id );
    //    } else if ( lobby != null && game == null ) {
    //        console.log( "game not found. lobbyid= " + lobby.id );
    //    }

    var cardIdString: string = query["cardId"];
    if ( cardIdString != null ) {
        var cardId: number = parseInt( cardIdString );
        card = CardManager.Instance.getCard( cardId );
    }

    var result: ServerEvent = command.execute( game, lobby, player, card, name );
    var json: string = JSON.stringify( result );
    respond( _response, json );

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
//}