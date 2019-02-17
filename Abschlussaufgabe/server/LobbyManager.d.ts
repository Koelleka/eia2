import { Lobby } from "./Lobby";
import { Player } from "./Player";
export declare class LobbyManager {
    private static _instance;
    lobbies: Lobby[];
    private constructor();
    openLobby(_name: string, _player: Player): Lobby;
    closeLobby(_id: number): void;
    getLobby(_id: number): Lobby;
    getLobbies(): Lobby[];
    static readonly Instance: LobbyManager;
}
