import { GameCard } from "./CardManager";
import { Lobby } from "./Lobby";
import { Player } from "./Player";
import { Game } from "./Game";
export declare class ServerEvent {
    type: string;
    success: boolean;
    lobby: Lobby;
    game: Game;
    player: Player;
    currentPlayerId: number;
    card: GameCard;
    lobbyList: Lobby[];
    playerList: Player[];
}
