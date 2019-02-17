import { Player } from "./Player";
import { Lobby } from "./Lobby";
import { GameCard } from "./CardManager";
import { CardManager } from "./CardManager";

export class Game {
    public id: number;
    public players: Player[];
    public currentPlayer: Player;
    public lobby: Lobby;
    public deck: GameCard[];

    public initGame( _players: Player[] ): void {
        this.players = _players;
        // https://stackoverflow.com/a/46935425
        this.deck = Object.assign( [], CardManager.Instance.cards );

        var i: number = ( Math.random() * 10000 ) % this.players.length;
        this.currentPlayer = this.players[i];
    }

    public playCard( _card: GameCard ): Player {
        if ( this.canPlayCard( _card ) ) {
            // TODO
            return this.nextPlayer( this.currentPlayer );
        }
        return this.currentPlayer;
    }

    public canPlayCard( _card: GameCard ): boolean {
        return true; // TODO
    }

    private nextPlayer( _currentPlayer: Player ): Player {
        var i: number = this.players.indexOf( _currentPlayer );
        i = ( i + 1 ) % this.players.length;
        this.currentPlayer = this.players[i];
        return this.currentPlayer;
    }

    public pickCard(): GameCard {
        var i: number = ( Math.random() * 10000 ) % this.deck.length;
        var card: GameCard = this.deck[i];
        this.currentPlayer.cards.push( card );
        this.nextPlayer( this.currentPlayer );
        return card;
    }

}