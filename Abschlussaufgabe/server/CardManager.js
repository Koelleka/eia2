"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameCard = (function () {
    function GameCard() {
    }
    return GameCard;
}());
exports.GameCard = GameCard;
var CardManager = (function () {
    function CardManager() {
        this.cards = [];
        this.initCards();
    }
    CardManager.prototype.initCards = function () {
        var cardColors = ["red", "blue", "green", "yellow"];
        var actionCards = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
        var jokerCards = []; // 4 pro Joker FW = Farbe wählen
        var numberCards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.cards = [];
        var counter = 0;
        for (var i = 0; i < cardColors.length; i++) {
            var color = cardColors[i];
            // Aktionskarten
            for (var j = 0; j < 2; j++) {
                for (var k = 0; k < actionCards.length; k++) {
                    var type = actionCards[k];
                    var card = new GameCard();
                    card.id = counter++;
                    card.color = color;
                    card.type = type;
                    this.cards.push(card);
                }
            }
            // Zahlenkarten
            for (j = 0; j < 4; j++) {
                for (k = 0; k < numberCards.length; k++) {
                    type = numberCards[k];
                    card = new GameCard();
                    card.id = counter++;
                    card.color = color;
                    card.type = type;
                    this.cards.push(card);
                }
            }
        }
        // Jokerkarten
        for (i = 0; i < 4; i++) {
            for (j = 0; j < jokerCards.length; j++) {
                type = jokerCards[j];
                card = new GameCard();
                card.id = counter++;
                card.type = type;
                card.isJoker = true;
                this.cards.push(card);
            }
        }
    };
    CardManager.prototype.getCard = function (_id) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == _id)
                return this.cards[i];
        }
    };
    Object.defineProperty(CardManager, "Instance", {
        // https://stackoverflow.com/a/36978360
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return CardManager;
}());
exports.CardManager = CardManager;
//# sourceMappingURL=CardManager.js.map