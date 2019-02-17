import { Game } from "./Game";
import { Lobby } from "./Lobby";
import { Player } from "./Player";
import { GameCard } from "./CardManager";
import { ServerEvent } from "./ServerEvent";
import { PlayerManager } from "./PlayerManager";
import { LobbyManager } from "./LobbyManager";

export class Command {
    public command: string;
    public gameId: number;
    public lobbyId: number;
    public playerId: number;
    public cardId: number;

    public constructor() {
        console.log( "new command" );
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
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

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
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

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var event: ServerEvent = new ServerEvent();
        event.type = this.command;
        event.card = _card;
        event.game = _game;
        event.lobby = _lobby;

        if ( !_game.canPlayCard( _card ) ) {
            event.success = false;
        } else {
            event.success = true;
            _game.playCard( _card );
        }

        event.player = _game.currentPlayer;
        event.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();

        return event;
    }
}

export class PickCardCommand extends Command {
    public constructor() {
        super();
        this.command = "pickCard";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var card: GameCard = _game.pickCard();
        var nextPlayer: Player = _game.currentPlayer;

        var event: ServerEvent = new ServerEvent();
        event.type = this.command;
        event.card = card;
        event.game = _game;
        event.lobby = _lobby;
        event.player = nextPlayer;
        event.success = true;

        event.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();

        return event;
    }
}

// Lobby Commands
export class CreateLobbyCommand extends Command {
    public constructor() {
        super();
        this.command = "createLobby";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var lobby: Lobby = LobbyManager.Instance.openLobby( _name, _player );
        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        if ( lobby != null ) {
            resultEvent.success = true;
            resultEvent.lobby = lobby;
        }
        return resultEvent;
    }
}

export class GetLobbiesCommand extends Command {
    public constructor() {
        super();
        this.command = "getLobbies";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var lobbies: Lobby[] = LobbyManager.Instance.getLobbies();
        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;

        resultEvent.success = true;
        resultEvent.lobbyList = lobbies;

        return resultEvent;
    }
}

export class JoinLobbyCommand extends Command {
    public constructor() {
        super();
        this.command = "joinLobby";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var success: boolean = _lobby.join( _player.id );
        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = success;
        resultEvent.lobby = _lobby;

        return resultEvent;
    }
}

export class LeaveLobbyCommand extends Command {
    public constructor() {
        super();
        this.command = "leaveLobby";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        _lobby.leave( _player.id );
        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        return resultEvent;
    }
}

export class GetLobbyPlayersCommand extends Command {
    public constructor() {
        super();
        this.command = "getLobbyPlayers";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        resultEvent.playerList = _lobby.players;
        resultEvent.success = true;
        return resultEvent;
    }
}

export class ReadyCommand extends Command {
    public constructor() {
        super();
        this.command = "ready";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        _lobby.ready( _player.id );
        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        if ( _lobby.allPlayersReady() ) {
            resultEvent.type = "startGame";
            resultEvent.game = _lobby.startGame();
            resultEvent.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();
        }
        return resultEvent;
    }
}

export class GetGameStateCommand extends Command {
    public constructor() {
        super();
        this.command = "getGameState";
    }

    public execute( _game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string ): ServerEvent {
        super.execute( _game, _lobby, _player, _card, _name );

        var resultEvent: ServerEvent = new ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        resultEvent.game = _game;
        if ( resultEvent.game == null && _lobby != null ) {
            resultEvent.game = _lobby.game;
            resultEvent.game.checkIfPlayerWonGame();
        }
        return resultEvent;
    }
}