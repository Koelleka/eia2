declare namespace UnoServer {
    class ServerEvent {
        type: string;
        success: boolean;
        lobby: Lobby;
        game: Game;
        player: Player;
        card: Card;
    }
}
