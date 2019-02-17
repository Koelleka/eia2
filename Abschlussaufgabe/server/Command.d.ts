import { Game } from "./Game";
import { Lobby } from "./Lobby";
import { Player } from "./Player";
import { GameCard } from "./CardManager";
import { ServerEvent } from "./ServerEvent";
export declare class Command {
    command: string;
    gameId: number;
    lobbyId: number;
    playerId: number;
    cardId: number;
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class CreatePlayerCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class PlayCardCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class PickCardCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class CreateLobbyCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class GetLobbiesCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class JoinLobbyCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class LeaveLobbyCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class GetLobbyPlayersCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
export declare class ReadyCommand extends Command {
    constructor();
    execute(_game: Game, _lobby: Lobby, _player: Player, _card: GameCard, _name: string): ServerEvent;
}
