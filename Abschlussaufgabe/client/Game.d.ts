declare namespace UnoClient {
    class Game {
        id: number;
        name: string;
        lobby: Lobby;
        players: Player[];
        currentPlayer: Player;
        topCard: Card;
        isGameOver: boolean;
        winner: Player;
        static currentGame: Game;
    }
}
