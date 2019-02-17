export declare class GameCard {
    id: number;
    color: string;
    type: string;
    isJoker: boolean;
}
export declare class CardManager {
    private static _instance;
    cards: GameCard[];
    private constructor();
    private initCards();
    getCard(_id: number): GameCard;
    static readonly Instance: CardManager;
}
