declare namespace UnoServer {
    class Command {
        command: string;
        gameId: number;
        lobbyId: number;
        playerId: number;
        cardId: number;
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class CreatePlayerCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class PlayCardCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class PickCardCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class CreateLobbyCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class JoinLobbyCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class LeaveLobbyCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
    class ReadyCommand extends Command {
        constructor();
        execute(_game: Game, _lobby: Lobby, _player: Player, _card: Card, _name: string): ServerEvent;
    }
}
