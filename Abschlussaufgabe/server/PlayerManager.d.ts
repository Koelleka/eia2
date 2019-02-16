declare namespace UnoServer {
    class PlayerManager {
        private static _instance;
        players: Player[];
        private constructor();
        createPlayer(_name: string): Player;
        getPlayer(_id: number): Player;
        static readonly Instance: PlayerManager;
    }
}
