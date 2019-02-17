import { Player } from "./Player";
import { Lobby } from "./Lobby";
import { GameCard } from "./CardManager";
import { CardManager } from "./CardManager";

export class Game {
    public id: number;
    public players: Player[];
    public currentPlayer: Player;
    public topCard: GameCard;
    public deck: GameCard[];
    public playedCards: GameCard[];
    public isGameOver: boolean;
    public winner: Player;

    public initGame( _players: Player[] ): void {
        console.log( "init game with players " + _players.length );
        this.playedCards = [];
        this.players = _players;
        // https://stackoverflow.com/a/46935425 
        this.deck = CardManager.Instance.cards; // Object.assign( [], CardManager.Instance.cards );

        console.log( "pick random cards" );
        for ( var i: number = 0; i < this.players.length; i++ ) {
            var player: Player = this.players[i];
            for ( var j: number = 0; j < 8; j++ ) {
                var card: GameCard = this.pickRandomCard();
                player.cards.push( card );
            }
        }

        console.log( "pick top card" );
        this.topCard = this.pickRandomCard();
        this.playedCards.push( this.topCard );

        i = ( Math.floor( Math.random() * 10000 ) ) % this.players.length;
        console.log( "pick random player at index: " + i );
        this.currentPlayer = this.players[i];
        console.log( "first player id: " + this.currentPlayer.name );
    }

    public playCard( _card: GameCard ): Player {
        console.log( "play card " + _card.id );
        if ( this.canPlayCard( _card ) ) {
            var index: number = this.currentPlayer.cards.indexOf( _card );
            console.log( "remove card at index " + index );
            this.currentPlayer.cards.splice( index, 1 );
            this.playedCards.push( _card );
            this.getTopCard();
            return this.nextPlayer( this.currentPlayer );
        }
        return this.currentPlayer;
    }

    private getTopCard(): GameCard {
        this.topCard = this.playedCards[this.playedCards.length - 1];
        return this.topCard;
    }

    public canPlayCard( _card: GameCard ): boolean {
        var topCard: GameCard = this.getTopCard();
        if ( _card.isJoker || _card.color == topCard.color || _card.type == topCard.type ) {
            var index: number = this.currentPlayer.cards.indexOf( _card );
            if ( index == -1 ) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    private nextPlayer( _currentPlayer: Player ): Player {
        var i: number = this.players.indexOf( _currentPlayer );
        i = ( i + 1 ) % this.players.length;
        console.log( "get next player. currentPlayer " + this.players.indexOf( _currentPlayer ) + " next player " + i );
        this.currentPlayer = this.players[i];
        return this.currentPlayer;
    }

    public pickCard(): GameCard {
        var card: GameCard = this.pickRandomCard();
        this.currentPlayer.cards.push( card );
        this.nextPlayer( this.currentPlayer );
        return card;
    }

    private pickRandomCard(): GameCard {
        var i: number = ( Math.floor( Math.random() * 10000 ) ) % this.deck.length;
        var card: GameCard = this.deck[i];
        this.deck = this.deck.filter( function( _obj: GameCard ): boolean {
            return _obj.id != card.id;
        } );
        return card;
    }

    public checkIfCurrentPlayerIsComputerAndPlayIfTrue(): void {
        console.log( "checkIfCurrentPlayerIsComputerAndPlayIfTrue" );
        if ( !this.currentPlayer.isComputer ) {
            console.log( "current player is not a computer! " + this.currentPlayer.name );
            return;
        }

        while ( this.currentPlayer.isComputer ) {
            console.log( "current player is computer " + this.currentPlayer.id );

            var cardPlayed: boolean = false;
            for ( var i: number = 0; i < this.currentPlayer.cards.length; i++ ) {
                var card: GameCard = this.currentPlayer.cards[i];
                if ( this.canPlayCard( card ) ) {
                    this.playCard( card );
                    cardPlayed = true;
                    console.log( "computer played a card " + card.id );
                    break;
                }
            }

            if ( !cardPlayed ) {
                card = this.pickCard();
                console.log( "computer picked a card: " + card.id );
            }

            if ( this.checkIfPlayerWonGame() ) {
                return;
            }
        }
    }

    public checkIfPlayerWonGame(): boolean {
        for ( var i: number = 0; i < this.players.length; i++ ) {
            var player: Player = this.players[i];
            if ( player.cards.length == 0 ) {
                console.log( "game over! " + this.currentPlayer.name );
                this.isGameOver = true;
                this.winner = this.currentPlayer;
                return true;
            }
        }
        return false;
    }
}