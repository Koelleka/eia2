namespace UnoClient {
    export class ClientEvent {
        public type: string;
        public player: Player;
        public game: Game;
        public card: Card;
        public lobby: Lobby;
        public success: boolean;
        public lobbyList: Lobby[];
    }
}