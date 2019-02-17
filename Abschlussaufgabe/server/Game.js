"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardManager_1 = require("./CardManager");
var Game = (function () {
    function Game() {
    }
    Game.prototype.initGame = function (_players) {
        console.log("init game with players " + _players.length);
        this.playedCards = [];
        this.players = _players;
        // https://stackoverflow.com/a/46935425 
        this.deck = CardManager_1.CardManager.Instance.cards; // Object.assign( [], CardManager.Instance.cards );
        console.log("pick random cards");
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            for (var j = 0; j < 8; j++) {
                var card = this.pickRandomCard();
                player.cards.push(card);
            }
        }
        console.log("pick top card");
        this.topCard = this.pickRandomCard();
        this.playedCards.push(this.topCard);
        i = (Math.floor(Math.random() * 10000)) % this.players.length;
        console.log("pick random player at index: " + i);
        this.currentPlayer = this.players[i];
        console.log("first player id: " + this.currentPlayer.name);
    };
    Game.prototype.playCard = function (_card) {
        console.log("play card " + _card.id);
        if (this.canPlayCard(_card)) {
            var index = this.currentPlayer.cards.indexOf(_card);
            console.log("remove card at index " + index);
            this.currentPlayer.cards.splice(index, 1);
            this.playedCards.push(_card);
            this.getTopCard();
            return this.nextPlayer(this.currentPlayer);
        }
        return this.currentPlayer;
    };
    Game.prototype.getTopCard = function () {
        this.topCard = this.playedCards[this.playedCards.length - 1];
        return this.topCard;
    };
    Game.prototype.canPlayCard = function (_card) {
        var topCard = this.getTopCard();
        if (_card.isJoker || _card.color == topCard.color || _card.type == topCard.type) {
            var index = this.currentPlayer.cards.indexOf(_card);
            if (index == -1) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
    Game.prototype.nextPlayer = function (_currentPlayer) {
        var i = this.players.indexOf(_currentPlayer);
        i = (i + 1) % this.players.length;
        console.log("get next player. currentPlayer " + this.players.indexOf(_currentPlayer) + " next player " + i);
        this.currentPlayer = this.players[i];
        return this.currentPlayer;
    };
    Game.prototype.pickCard = function () {
        var card = this.pickRandomCard();
        this.currentPlayer.cards.push(card);
        this.nextPlayer(this.currentPlayer);
        return card;
    };
    Game.prototype.pickRandomCard = function () {
        var i = (Math.floor(Math.random() * 10000)) % this.deck.length;
        var card = this.deck[i];
        this.deck = this.deck.filter(function (_obj) {
            return _obj.id != card.id;
        });
        return card;
    };
    Game.prototype.checkIfCurrentPlayerIsComputerAndPlayIfTrue = function () {
        console.log("checkIfCurrentPlayerIsComputerAndPlayIfTrue");
        if (!this.currentPlayer.isComputer) {
            console.log("current player is not a computer! " + this.currentPlayer.name);
            return;
        }
        while (this.currentPlayer.isComputer) {
            console.log("current player is computer " + this.currentPlayer.id);
            var cardPlayed = false;
            for (var i = 0; i < this.currentPlayer.cards.length; i++) {
                var card = this.currentPlayer.cards[i];
                if (this.canPlayCard(card)) {
                    this.playCard(card);
                    cardPlayed = true;
                    console.log("computer played a card " + card.id);
                    break;
                }
            }
            if (!cardPlayed) {
                card = this.pickCard();
                console.log("computer picked a card: " + card.id);
            }
            if (this.checkIfPlayerWonGame()) {
                return;
            }
        }
    };
    Game.prototype.checkIfPlayerWonGame = function () {
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (player.cards.length == 0) {
                console.log("game over! " + this.currentPlayer.name);
                this.isGameOver = true;
                this.winner = this.currentPlayer;
                return true;
            }
        }
        return false;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map