namespace UnoServer {
    export class Command {
        public command: string;
        public gameId: number;
        public lobbyId: number;
        public playerId: number;
        public cardId: number;

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            console.log( "executing command " + this.command );
            return null;
        }
    }

    // Player Commands
    export class CreatePlayerCommand extends Command {
        public constructor() {
            super();
            this.command = "createPlayer";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            var player: Player = PlayerManager.Instance.createPlayer( _name );
            var resultEvent: ServerEvent = new ServerEvent();
            resultEvent.type = this.command;
            if ( player != null ) {
                resultEvent.success = true;
                resultEvent.player = player;
            }
            return resultEvent;
        }
    }

    // Game Commands
    export class PlayCardCommand extends Command {
        public constructor() {
            super();
            this.command = "playCard";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            // TODO Hier muss die ganze SPiele logik rein
            return null;
        }
    }

    export class PickCardCommand extends Command {
        public constructor() {
            super();
            this.command = "pickCard";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            // TODO karte ziehen und als Event zurückschicken
            return null;
        }
    }

    // Lobby Commands
    export class CreateLobbyCommand extends Command {
        public constructor() {
            super();
            this.command = "createLobby";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            var lobby: Lobby = LobbyManager.Instance.openLobby( _name );
            var resultEvent: ServerEvent = new ServerEvent();
            resultEvent.type = this.command;
            if ( lobby != null ) {
                resultEvent.success = true;
                resultEvent.lobby = lobby;
            }
            return resultEvent;
        }
    }

    export class JoinLobbyCommand extends Command {
        public constructor() {
            super();
            this.command = "joinLobby";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            var success: boolean = _lobby.join( _player.id );
            var resultEvent: ServerEvent = new ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = success;
            return resultEvent;
        }
    }

    export class LeaveLobbyCommand extends Command {
        public constructor() {
            super();
            this.command = "leaveLobby";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            _lobby.leave( _player.id );
            var resultEvent: ServerEvent = new ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = true;
            return resultEvent;
        }
    }

    export class ReadyCommand extends Command {
        public constructor() {
            super();
            this.command = "ready";
        }

        public execute( _game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string ): ServerEvent {
            super.execute( _game, _lobby, _player, _card, _name );

            _lobby.ready( _player.id );
            var resultEvent: ServerEvent = new ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = true;
            if ( _lobby.allPlayersReady() ) {
                resultEvent.type = "startGame";
                resultEvent.game = _lobby.startGame();
            }
            return resultEvent;
        }
    }
}