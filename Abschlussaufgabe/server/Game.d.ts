import { Player } from "./Player";
import { GameCard } from "./CardManager";
export declare class Game {
    id: number;
    players: Player[];
    currentPlayer: Player;
    topCard: GameCard;
    deck: GameCard[];
    playedCards: GameCard[];
    isGameOver: boolean;
    winner: Player;
    initGame(_players: Player[]): void;
    playCard(_card: GameCard): Player;
    private getTopCard();
    canPlayCard(_card: GameCard): boolean;
    private nextPlayer(_currentPlayer);
    pickCard(): GameCard;
    private pickRandomCard();
    checkIfCurrentPlayerIsComputerAndPlayIfTrue(): void;
    checkIfPlayerWonGame(): boolean;
}
