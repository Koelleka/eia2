import { GameCard } from "./CardManager";
import { Lobby } from "./Lobby";
import { Player } from "./Player";
import { Game } from "./Game";

export class ServerEvent {
    public type: string;
    public success: boolean;
    public lobby: Lobby;
    public game: Game;
    public player: Player;
    public currentPlayerId: number;
    public card: GameCard;
    public lobbyList: Lobby[];
    public playerList: Player[];
}
