import { Lobby } from "./Lobby";
export declare class LobbyManager {
    private static _instance;
    lobbies: Lobby[];
    private constructor();
    openLobby(_name: string): Lobby;
    closeLobby(_id: number): void;
    getLobby(_id: number): Lobby;
    getLobbies(): Lobby[];
    static readonly Instance: LobbyManager;
}
