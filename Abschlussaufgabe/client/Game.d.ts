declare namespace UnoClient {
    class Game {
        id: number;
        name: string;
        lobby: Lobby;
        static currentGame: Game;
    }
}
