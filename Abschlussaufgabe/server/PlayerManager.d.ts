import { Player } from "./Player";
export declare class PlayerManager {
    private static _instance;
    players: Player[];
    private constructor();
    currentPlayer: Player;
    createPlayer(_name: string): Player;
    getPlayer(_id: number): Player;
    static readonly Instance: PlayerManager;
}
