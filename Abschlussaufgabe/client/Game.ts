namespace UnoClient {
    export class Game {
        public id: number;
        public name: string;
        public lobby: Lobby;
        public players: Player[];
        public currentPlayer: Player;
        public topCard: Card;
        public isGameOver: boolean;
        public winner: Player;
        public static currentGame: Game;
    }
}