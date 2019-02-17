import { Player } from "./Player";
import { Lobby } from "./Lobby";
import { GameCard } from "./CardManager";
export declare class Game {
    id: number;
    players: Player[];
    currentPlayer: Player;
    lobby: Lobby;
    deck: GameCard[];
    initGame(_players: Player[]): void;
    playCard(_card: GameCard): Player;
    canPlayCard(_card: GameCard): boolean;
    private nextPlayer(_currentPlayer);
    pickCard(): GameCard;
}
