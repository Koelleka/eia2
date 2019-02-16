namespace UnoClient {
    export class Game {
        public id: number;
        public name: string;
        public lobby: Lobby;
        public static currentGame: Game;
    }
}