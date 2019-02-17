import { GameCard } from "./CardManager";
export declare class Player {
    id: number;
    name: string;
    cards: GameCard[];
    isReady: boolean;
    isComputer: boolean;
    constructor();
}
