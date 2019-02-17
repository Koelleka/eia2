namespace UnoClient {
    export class Player {
        public id: number;
        public name: string;
        public cardCount: number; // Das ist für die anderen Mitspieler, das man die Karten nicht sieht
        public cards: Card[]; // Das sind die eigenen Karten
        public isComputer: boolean;
        public static currentPlayer: Player;
    }
}