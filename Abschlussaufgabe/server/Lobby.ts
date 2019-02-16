namespace UnoServer {
    export class Lobby {
        public id: number;
        public name: string;
        public players: Player[];
        public game: Game;

        public join( _id: number ): boolean {
            let player: Player = PlayerManager.Instance.getPlayer( _id );
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
            console.log( "Players in lobby " + this.players );
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
        }

        public ready( _id: number ): void {
            let player: Player = PlayerManager.Instance.getPlayer( _id );
            if ( player == null ) {
                console.log( "player not found " + _id );
                return;
            }
            player.isReady = true;

        }

        public allPlayersReady(): boolean {
            let allPlayersReady: boolean = true;
            for ( var i: number = 0; i < this.players.length; i++ ) {
                allPlayersReady = allPlayersReady && this.players[i].isReady;
            }
            return allPlayersReady;
        }

        public startGame(): Game {
            if ( this.game == null ) {
                this.game = new Game();
                this.game.id = this.id;
                this.game.lobby = this;
            }
            return this.game;
        }
    }
}