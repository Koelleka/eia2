import { Lobby } from "./Lobby";
import { Player } from "./Player";


export class LobbyManager {
    private static _instance: LobbyManager;
    public lobbies: Lobby[];

    private constructor() {
        this.lobbies = [];
    }

    public openLobby( _name: string, _player: Player ): Lobby {
        console.log( "openLobby " + _name );
        let lobby: Lobby = new Lobby();
        lobby.id = Math.floor( Math.random() * 10000 );
        lobby.name = _name;
        this.lobbies.push( lobby );
        console.log( "lobby created " + lobby.id );
        lobby.join( _player.id );
        return lobby;
    }

    public closeLobby( _id: number ): void {
        console.log( "closeLobby " + _id );
        var lobby: Lobby = this.getLobby( _id );
        if ( lobby != null ) {

            // Eigentlich müsste man hier jetzt noch alle Spieler aus der Lobby kicken...

            this.lobbies = this.lobbies.filter( function( _obj: Lobby ): boolean {
                return _obj.id != _id;
            } );
        }
    }

    public getLobby( _id: number ): Lobby {
        for ( var i: number = 0; i < this.lobbies.length; i++ ) {
            var lobby: Lobby = this.lobbies[i];
            if ( lobby.id == _id ) {
                return lobby;
            }
        }
        return null;
    }

    public getLobbies(): Lobby[] {
        return this.lobbies;
    }

    // https://stackoverflow.com/a/36978360
    public static get Instance(): LobbyManager {
        return this._instance || ( this._instance = new this() );
    }
}