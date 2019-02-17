import { Player } from "./Player";
import { Game } from "./Game";
import { PlayerManager } from "./PlayerManager";
import { LobbyManager } from "./LobbyManager";

export class Lobby {
    public id: number;
    public name: string;
    public players: Player[];
    public game: Game;

    public constructor() {
        this.players = [];
    }

    public join( _id: number ): boolean {
        let player: Player = PlayerManager.Instance.getPlayer( _id );
        if ( this.players.length >= 4 ) {
            return false;
        }
        if ( player == null ) {
            console.log( "player not found " + _id );
            return false;
        }
        for ( var i: number = 0; i < this.players.length; i++ ) {
            if ( this.players[i].id == _id )
                return false;
        }

        console.log( "Player joined " + player.id );
        this.players.push( player );
        console.log( "Players in lobby " + this.players.length );
        return true;
    }

    public leave( _id: number ): void {
        let player: Player = PlayerManager.Instance.getPlayer( _id );
        if ( player == null ) {
            console.log( "player not found " + _id );
            return;
        }
        console.log( "Player left " + player.id );
        this.players = this.players.filter( function( _obj: Player ): boolean {
            return _obj.id != player.id;
        } );
        console.log( "Players in lobby " + this.players );
        if ( this.players.length == 0 ) {
            LobbyManager.Instance.closeLobby( this.id );
        }
    }

    public ready( _id: number ): void {
        console.log( "check ready for player id " + _id );
        let player: Player = PlayerManager.Instance.getPlayer( _id );
        if ( player == null ) {
            console.log( "player not found " + _id );
            return;
        }
        console.log( "Player " + player.name + " is ready" );
        player.isReady = true;

    }

    public allPlayersReady(): boolean {
        let allPlayersReady: boolean = true;
        for ( var i: number = 0; i < this.players.length; i++ ) {
            allPlayersReady = allPlayersReady && this.players[i].isReady;
        }
        console.log( "All players ready? " + allPlayersReady );
        return allPlayersReady;
    }

    public startGame(): Game {
        console.log( "start game " + this.game );
        if ( this.game == null ) {
            this.game = new Game();
            this.game.id = this.id;

            if ( this.players.length < 4 ) {
                var computerPlayers: number = 4 - this.players.length;
                console.log( "create computer players " + computerPlayers );
                for ( var i: number = 0; i < computerPlayers; i++ ) {
                    var computerPlayer: Player = PlayerManager.Instance.createPlayer( "Computer " + ( i + 1 ) );
                    computerPlayer.isComputer = true;
                    computerPlayer.isReady = true;
                    this.players.push( computerPlayer );
                }
            }

            this.game.initGame( this.players );
        }
        return this.game;
    }
}