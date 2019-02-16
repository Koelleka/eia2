namespace UnoServer {
    export class ServerEvent {
        public type: string;
        public success: boolean;
        public lobby: Lobby;
        public game: Game;
        public player: Player;
        public card: Card;
    }
}