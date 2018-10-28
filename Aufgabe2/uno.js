var uno;
(function (uno) {
    // Mit den Infos bauen wir später alle Karten die es gibt
    //alle Farben die es gibt 
    let cardColors = ["red", "blue", "green", "yellow"];
    //Alle vorhandenen Aktionskarten ges. Spiel
    let actionCards = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
    let jokerCards = ["FW", "+4"]; // 4 pro Joker FW = Farbe wählen
    let numberCards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // Alle noch verfügbaren Karten im Spiel
    var deck;
    // Karten auf meine Hand
    var myCards;
    // Eine Klasse um eine Karte zu beschreiben (farbe + art)
    class Card {
        constructor(_farbe, _art) {
            this.color = _farbe; //this=zugriff auf "farbe, art"
            this.value = _art; //this=Eigenreferenz 
        }
    }
    // Spiel initialisieren
    function start() {
        //promt=Eingabefenster
        var input = prompt("Bitte die Spielkartenanzahl auswählen: ", "5");
        var anzahl = Number(input);
        createAllCards(); //Funktionsaufruf
        myCards = [];
        for (var i = 0; i < anzahl; i++) {
            pickRandomCard(); //Funktionsaufruf
        }
        drawMyCards(); //Funktionsaufruf
    }
    function createAllCards() {
        deck = [];
        for (var i = 0; i < cardColors.length; i++) {
            var color = cardColors[i];
            // Aktionskarten
            for (var j = 0; j < 2; j++) {
                for (var k = 0; k < actionCards.length; k++) {
                    var art = actionCards[k];
                    var karte = new Card(color, art); //constructor 
                    deck.push(karte); //karte wird auf den stapel gelegt 
                }
            }
            // Zahlenkarten
            for (j = 0; j < 4; j++) {
                for (k = 0; k < numberCards.length; k++) {
                    art = numberCards[k];
                    karte = new Card(color, art);
                    deck.push(karte);
                }
            }
        }
        // Jokerkarten
        for (i = 0; i < 4; i++) {
            for (j = 0; j < jokerCards.length; j++) {
                art = jokerCards[j];
                karte = new Card(null, art);
                deck.push(karte);
            }
        }
    }
    function pickRandomCard() {
        // Anzahl verbleibender Karten im deck
        let remainingCardsInDeck = deck.length;
        // Zufälligen Index erzeugen, welche Karte wir aus dem deck nehmen
        var index = Math.floor(Math.random() * remainingCardsInDeck); //floor schneidet komma zahl weg//
        // Karte aus dem deck holen
        var card = deck[index];
        // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
        deck.splice(index, 1);
        myCards.push(card); //karte wird auf "meinen Stapel gelegt
    }
    function drawMyCards() {
        for (var i = 0; i < myCards.length; i++) {
            var tmpCard = myCards[i];
            //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
            let card = document.createElement("div"); //document, html element erstellen typ div
            card.className = "card";
            // <div class="bg green"></div> 
            let bg = document.createElement("div");
            bg.className = "bg " + tmpCard.color;
            card.appendChild(bg); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt
            // <div class="circle"></div> //Ellipse der Karte hinzufügen
            let kreis = document.createElement("div");
            kreis.className = "circle";
            card.appendChild(kreis); //fügt die Ellipse dieser einen Karte hinzu 
            //  <div class="top-left">9</div> 
            let obenLinks = document.createElement("div");
            obenLinks.className = "top-left";
            obenLinks.innerHTML = tmpCard.value; //was kommt auf diese karte drauf idF Zahl
            card.appendChild(obenLinks); //fügt die zahl oben links dieser Karte hinzu
            //  <div class="center">9</div> 
            let zentrum = document.createElement("div");
            zentrum.className = "center";
            zentrum.innerHTML = tmpCard.value; //was kommt auf diese Karte idF die Zahl zentriert
            card.appendChild(zentrum); //fügt die Zahl zentriert dieser Karte hinzu
            // <div class="bottom-right">9</div> 
            let untenRechts = document.createElement("div");
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = tmpCard.value;
            card.appendChild(untenRechts);
            let style = card.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";
            document.body.appendChild(card); //Karte HTML body hinzufügen
        }
    }
    document.addEventListener("DOMContentLoaded", start); //
})(uno || (uno = {}));
//# sourceMappingURL=uno.js.map