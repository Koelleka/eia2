declare namespace UnoClient {
    class ClientEvent {
        type: string;
        player: Player;
        game: Game;
        card: Card;
        lobby: Lobby;
        currentPlayerId: number;
        success: boolean;
        lobbyList: Lobby[];
    }
}
