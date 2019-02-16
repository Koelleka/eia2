declare namespace UnoServer {
    class Lobby {
        id: number;
        name: string;
        players: Player[];
        game: Game;
        join(_id: number): boolean;
        leave(_id: number): void;
        ready(_id: number): void;
        allPlayersReady(): boolean;
        startGame(): Game;
    }
}
