import { Player } from "./Player";
export declare class PlayerManager {
    private static _instance;
    private id;
    players: Player[];
    private constructor();
    createPlayer(_name: string): Player;
    getPlayer(_id: number): Player;
    static readonly Instance: PlayerManager;
}
