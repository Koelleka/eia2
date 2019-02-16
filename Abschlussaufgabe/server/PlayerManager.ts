namespace UnoServer {
    export class PlayerManager {
        private static _instance: PlayerManager;
        public players: Player[];

        private constructor() {
            this.players = [];
        }

        public createPlayer( _name: string ): Player {
            console.log( "createPlayer " + _name );
            let player: Player = new Player();
            player.id = Math.floor( Math.random() * 10000 );
            player.name = _name;
            this.players.push( player );
            console.log( "player created " + player.id );
            return player;
        }

        public getPlayer( _id: number ): Player {
            for ( var i: number = 0; i < this.players.length; i++ ) {
                var player: Player = this.players[i];
                if ( player.id == _id ) {
                    return player;
                }
            }
            return null;
        }

        // https://stackoverflow.com/a/36978360
        public static get Instance(): PlayerManager {
            return this._instance || ( this._instance = new this() );
        }
    }
}