"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardManager_1 = require("./CardManager");
class Game {
    initGame(_players) {
        this.players = _players;
        // https://stackoverflow.com/a/46935425
        this.deck = Object.assign([], CardManager_1.CardManager.Instance.cards);
        var i = (Math.random() * 10000) % this.players.length;
        this.currentPlayer = this.players[i];
    }
    playCard(_card) {
        if (this.canPlayCard(_card)) {
            // TODO
            return this.nextPlayer(this.currentPlayer);
        }
        return this.currentPlayer;
    }
    canPlayCard(_card) {
        return true; // TODO
    }
    nextPlayer(_currentPlayer) {
        var i = this.players.indexOf(_currentPlayer);
        i = (i + 1) % this.players.length;
        this.currentPlayer = this.players[i];
        return this.currentPlayer;
    }
    pickCard() {
        var i = (Math.random() * 10000) % this.deck.length;
        var card = this.deck[i];
        this.currentPlayer.cards.push(card);
        this.nextPlayer(this.currentPlayer);
        return card;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map