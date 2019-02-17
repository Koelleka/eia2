import { Player } from "./Player";
import { Game } from "./Game";
export declare class Lobby {
    id: number;
    name: string;
    players: Player[];
    game: Game;
    constructor();
    join(_id: number): boolean;
    leave(_id: number): void;
    ready(_id: number): void;
    allPlayersReady(): boolean;
    startGame(): Game;
}
