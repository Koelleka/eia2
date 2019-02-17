declare namespace UnoClient {
    class Player {
        id: number;
        name: string;
        cardCount: number;
        cards: Card[];
        isComputer: boolean;
        static currentPlayer: Player;
    }
}
