var Uno2;
(function (Uno2) {
    document.addEventListener("DOMContentLoaded", start);
    // Mit den Infos bauen wir später alle Karten die es gibt
    //alle Farben die es gibt 
    var cardColors = ["red", "blue", "green", "yellow"];
    //Alle vorhandenen Aktionskarten ges. Spiel
    var actionCards = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
    var jokerCards = ["FW", "+4"]; // 4 pro Joker FW = Farbe wählen
    var numberCards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var players;
    // Alle noch verfügbaren Karten im Spiel
    var deck;
    var playedCards;
    var topCardZIndex = 1; // Das Z-Level der gespielten Karten
    // Eine Klasse um eine Karte zu beschreiben (farbe + art)
    var Card = (function () {
        function Card(_color, _type, _value, _isJoker, _id) {
            this.color = _color; //this=zugriff auf "farbe, art"
            this.type = _type; //this=Eigenreferenz 
            this.isJoker = _isJoker;
            this.cardId = _color + "_" + _id;
            if (_isJoker) {
                this.sortValue = 500 + _value;
            }
            else if (_color != null && _color == "red") {
                this.sortValue = 100 + _value;
            }
            else if (_color != null && _color == "blue") {
                this.sortValue = 200 + _value;
            }
            else if (_color != null && _color == "green") {
                this.sortValue = 300 + _value;
            }
            else if (_color != null && _color == "yellow") {
                this.sortValue = 400 + _value;
            }
            else {
                this.sortValue = 0;
            }
        }
        return Card;
    }());
    Uno2.Card = Card;
    var Player = (function () {
        function Player(_name) {
            this.name = _name;
            this.cards = [];
        }
        Player.prototype.getCardById = function (_id) {
            for (var i = 0; i < this.cards.length; i++) {
                if (this.cards[i].cardId == _id) {
                    return this.cards[i];
                }
            }
            return null;
        };
        return Player;
    }());
    Uno2.Player = Player;
    // Spiel initialisieren
    function start() {
        //promt=Eingabefenster
        var input = prompt("Bitte die Spielkartenanzahl auswählen: ", "5");
        var numberOfCards = Number(input);
        document.getElementById("sortButton").addEventListener("click", sortMyCards);
        document.getElementById("deck").addEventListener("click", mouseClickOnDeck);
        document.addEventListener("keydown", spaceKeyPressed);
        createAllCards(); //Funktionsaufruf
        playedCards = [];
        var topCard = pickRandomCard();
        var cardDiv = createCard(topCard);
        document.body.appendChild(cardDiv);
        playedCards.push(topCard);
        drawPlayedCard(topCard);
        players = [];
        // 4 Spieler initialisieren für spätere Aufgaben
        for (var i = 0; i < 4; i++) {
            var player = new Player("Spieler " + (i + 1));
            players.push(player);
            // Alle Spieler müssen die gleiche Anzahl an Karten ziehen
            for (i = 0; i < numberOfCards; i++) {
                pickRandomCardForPlayer(player); //Funktionsaufruf
            }
        }
        drawMyCards(); //Funktionsaufruf
    }
    // Wir sind immer Spieler 1 (an der Stelle 0)
    function getHumanPlayer() {
        return players[0];
    }
    // Liefert uns die letzte gespielte Karte zurück
    function getTopCard() {
        return playedCards[playedCards.length - 1];
    }
    function createAllCards() {
        deck = [];
        var counter = 0;
        for (var i = 0; i < cardColors.length; i++) {
            var color = cardColors[i];
            // Aktionskarten
            for (var j = 0; j < 2; j++) {
                for (var k = 0; k < actionCards.length; k++) {
                    var type = actionCards[k];
                    var karte = new Card(color, type, k, false, counter++); //constructor 
                    deck.push(karte); //karte wird auf den stapel gelegt 
                }
            }
            // Zahlenkarten
            for (j = 0; j < 4; j++) {
                for (k = 0; k < numberCards.length; k++) {
                    type = numberCards[k];
                    karte = new Card(color, type, k, false, counter++);
                    deck.push(karte);
                }
            }
        }
        // Jokerkarten
        for (i = 0; i < 4; i++) {
            for (j = 0; j < jokerCards.length; j++) {
                type = jokerCards[j];
                karte = new Card(null, type, k, true, counter++);
                deck.push(karte);
            }
        }
    }
    function pickRandomCardForPlayer(_player) {
        // Zufallskarte ziehen
        var card = pickRandomCard();
        if (card != null) {
            _player.cards.push(card); //karte wird auf meinen Stapel gelegt   
        }
        return card;
    }
    function pickRandomCard() {
        // Anzahl verbleibender Karten im deck
        var remainingCardsInDeck = deck.length;
        // Nur wenn noch Karten im Stapel sind, kann man auch eine Ziehen!
        if (remainingCardsInDeck > 0) {
            // Zufälligen Index erzeugen, welche Karte wir aus dem deck nehmen
            var index = Math.floor(Math.random() * remainingCardsInDeck); //floor schneidet komma zahl weg//
            // Karte aus dem deck holen
            var card = deck[index]; //Ergebnis mr*cards
            // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
            deck.splice(index, 1);
            // Karte zurückliefern
            return card;
        }
        return null;
    }
    function mouseClickOnMyCard(_event) {
        var divCard = _event.currentTarget;
        // nicht das Target nehmen, weil wir auch geschachtelte divs haben 
        // und dann evtl das falsche HTML Element im Event liegt
        var id = divCard.id;
        var player = getHumanPlayer();
        var card = player.getCardById(id);
        if (card != null) {
            tryPlayCard(player, card);
        }
        else {
            alert("Die Karte wurde nicht im Stapel gefunden: " + id);
        }
    }
    function mouseClickOnDeck(_event) {
        pickAndDrawCard();
    }
    function spaceKeyPressed(_event) {
        var keyCode = _event.keyCode;
        if (keyCode == 32) {
            pickAndDrawCard();
        }
    }
    function pickAndDrawCard() {
        var player = getHumanPlayer();
        var card = pickRandomCardForPlayer(player);
        var cardDiv = createCard(card);
        document.body.appendChild(cardDiv);
        cardDiv.addEventListener("click", mouseClickOnMyCard);
        redrawMyCards();
    }
    function tryPlayCard(_player, _card) {
        var topCard = getTopCard();
        if (_card.isJoker || _card.color == topCard.color || _card.type == topCard.type) {
            var index = _player.cards.indexOf(_card);
            if (index == -1) {
                alert("Fehler! Die Karte wurde nicht im Stapel des Spielers gefunden!");
                return;
            }
            _player.cards.splice(index, 1);
            playedCards.push(_card);
            drawPlayedCard(_card);
            redrawMyCards();
            // TODO nächster Spieler ist an der Reihe
        }
        else {
            alert("Die Karte kann nicht gespielt werden!");
        }
    }
    function sortMyCards() {
        var player = getHumanPlayer();
        // Sortieren nach der Sort Value
        player.cards.sort(function (_a, _b) {
            return _a.sortValue - _b.sortValue;
        });
        redrawMyCards();
    }
    function drawMyCards() {
        var player = getHumanPlayer();
        for (var i = 0; i < player.cards.length; i++) {
            var card = player.cards[i];
            var cardDiv = createCard(card);
            var style = cardDiv.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";
            document.body.appendChild(cardDiv); //Karte HTML body hinzufügen
            cardDiv.addEventListener("click", mouseClickOnMyCard);
        }
    }
    function createCard(_card) {
        //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
        var cardDiv = document.createElement("div"); //document, html element erstellen typ div
        cardDiv.className = "card";
        cardDiv.id = _card.cardId;
        // <div class="bg green"></div> 
        var bg = document.createElement("div");
        bg.className = "bg " + _card.color;
        cardDiv.appendChild(bg); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt
        // <div class="circle"></div> //Ellipse der Karte hinzufügen
        var kreis = document.createElement("div");
        kreis.className = "circle";
        cardDiv.appendChild(kreis); //fügt die Ellipse dieser einen Karte hinzu 
        //  <div class="top-left">9</div> 
        var obenLinks = document.createElement("div");
        obenLinks.className = "top-left";
        obenLinks.innerHTML = _card.type; //was kommt auf diese karte drauf idF Zahl
        cardDiv.appendChild(obenLinks); //fügt die zahl oben links dieser Karte hinzu
        //  <div class="center">9</div> 
        var zentrum = document.createElement("div");
        zentrum.className = "center";
        zentrum.innerHTML = _card.type; //was kommt auf diese Karte idF die Zahl zentriert
        cardDiv.appendChild(zentrum); //fügt die Zahl zentriert dieser Karte hinzu
        // <div class="bottom-right">9</div> 
        var untenRechts = document.createElement("div");
        untenRechts.className = "bottom-right";
        untenRechts.innerHTML = _card.type;
        cardDiv.appendChild(untenRechts);
        return cardDiv;
    }
    function redrawMyCards() {
        var player = getHumanPlayer();
        for (var i = 0; i < player.cards.length; i++) {
            var card = player.cards[i];
            var cardDiv = document.getElementById(card.cardId);
            var style = cardDiv.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";
            style.zIndex = (i + 1) + "";
        }
    }
    function drawPlayedCard(_card) {
        var cardDiv = document.getElementById(_card.cardId);
        var style = cardDiv.style;
        style.left = "10px";
        style.top = "10px";
        style.zIndex = (++topCardZIndex) + "";
        cardDiv.removeEventListener("click", mouseClickOnMyCard);
    }
    //
})(Uno2 || (Uno2 = {}));
//# sourceMappingURL=uno.js.map