import { GameCard } from "./CardManager";
export class Player {
    public id: number;
    public name: string;
    public cards: GameCard[];
    public isReady: boolean;
    public isComputer: boolean;

    public constructor() {
        this.cards = [];
    }
}   