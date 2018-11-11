namespace Uno {
    document.addEventListener( "DOMContentLoaded", start );

    // Mit den Infos bauen wir später alle Karten die es gibt

    //alle Farben die es gibt 
    let cardColors: string[] = ["red", "blue", "green", "yellow"];

    //Alle vorhandenen Aktionskarten ges. Spiel
    let actionCards: string[] = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
    let jokerCards: string[] = ["FW", "+4"]; // 4 pro Joker FW = Farbe wählen
    let numberCards: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    var players: Player[];

    // Alle noch verfügbaren Karten im Spiel
    var deck: Card[];
    var playedCards: Card[];
    let topCardZIndex: number = 1; // Das Z-Level der gespielten Karten

    // Eine Klasse um eine Karte zu beschreiben (farbe + art)
    export class Card { // export damit wir die Klasse auch in Player verwenden können!!
        color: string;
        type: string;
        isJoker: boolean; // Für die Jokerkarten
        sortValue: number;
        cardId: string;

        constructor( _color: string, _type: string, _value: number, _isJoker: boolean, _id: number ) {
            this.color = _color; //this=zugriff auf "farbe, art"
            this.type = _type; //this=Eigenreferenz 
            this.isJoker = _isJoker;
            this.cardId = _color + "_" + _id;

            if ( _isJoker ) {
                this.sortValue = 500 + _value;
            } else if ( _color != null && _color == "red" ) {
                this.sortValue = 100 + _value;
            } else if ( _color != null && _color == "blue" ) {
                this.sortValue = 200 + _value;
            } else if ( _color != null && _color == "green" ) {
                this.sortValue = 300 + _value;
            } else if ( _color != null && _color == "yellow" ) {
                this.sortValue = 400 + _value;
            } else {
                this.sortValue = 0;
            }
        }
    }

    export class Player {
        name: string;
        cards: Card[];

        constructor( _name: string ) {
            this.name = _name;
            this.cards = [];
        }

        getCardById( _id: string ): Card {
            for ( var i: number = 0; i < this.cards.length; i++ ) {
                if ( this.cards[i].cardId == _id ) {
                    return this.cards[i];
                }
            }
            return null;
        }
    }

    // Spiel initialisieren
    function start(): void {
        //promt=Eingabefenster
        var input: string = prompt( "Bitte die Spielkartenanzahl auswählen: ", "5" );
        var numberOfCards: number = Number( input );

        document.getElementById( "sortButton" ).addEventListener( "click", sortMyCards );
        document.getElementById( "deck" ).addEventListener( "click", mouseClickOnDeck );
        document.addEventListener( "keydown", spaceKeyPressed );

        createAllCards(); //Funktionsaufruf
        playedCards = [];

        var topCard: Card = pickRandomCard();
        var cardDiv: HTMLElement = createCard( topCard );
        document.body.appendChild( cardDiv );
        playedCards.push( topCard );
        drawPlayedCard( topCard );

        players = [];

        // 4 Spieler initialisieren für spätere Aufgaben
        for ( var i: number = 0; i < 4; i++ ) {
            var player: Player = new Player( "Spieler " + ( i + 1 ) );
            players.push( player );

            // Alle Spieler müssen die gleiche Anzahl an Karten ziehen
            for ( i = 0; i < numberOfCards; i++ ) { //5x=5 6=6 100=100 
                pickRandomCardForPlayer( player ); //Funktionsaufruf
            }
        }
        drawMyCards(); //Funktionsaufruf
    }

    // Wir sind immer Spieler 1 (an der Stelle 0)
    function getHumanPlayer(): Player {
        return players[0];
    }

    // Liefert uns die letzte gespielte Karte zurück
    function getTopCard(): Card {
        return playedCards[playedCards.length - 1];
    }

    function createAllCards(): void { //kein Rückgabewert
        deck = [];
        var counter: number = 0;
        for ( var i: number = 0; i < cardColors.length; i++ ) { //äußere for-schleife läuft 4x durch
            var color: string = cardColors[i];

            // Aktionskarten
            for ( var j: number = 0; j < 2; j++ ) { //2 von jeder Farbe
                for ( var k: number = 0; k < actionCards.length; k++ ) { //3
                    var type: string = actionCards[k];
                    var karte: Card = new Card( color, type, k, false, counter++ ); //constructor 
                    deck.push( karte ); //karte wird auf den stapel gelegt 
                }
            }

            // Zahlenkarten
            for ( j = 0; j < 4; j++ ) { //4 von jeder Farbe
                for ( k = 0; k < numberCards.length; k++ ) {
                    type = numberCards[k];
                    karte = new Card( color, type, k, false, counter++ );
                    deck.push( karte );
                }
            }
        }

        // Jokerkarten
        for ( i = 0; i < 4; i++ ) {
            for ( j = 0; j < jokerCards.length; j++ ) {
                type = jokerCards[j];
                karte = new Card( null, type, k, true, counter++ );
                deck.push( karte );
            }
        }
    }

    function pickRandomCardForPlayer( _player: Player ): Card { //Deklaration

        // Zufallskarte ziehen
        var card: Card = pickRandomCard();

        if ( card != null ) {
            _player.cards.push( card ); //karte wird auf meinen Stapel gelegt   
        }

        return card;
    }

    function pickRandomCard(): Card { //Deklaration

        // Anzahl verbleibender Karten im deck
        let remainingCardsInDeck: number = deck.length;

        // Nur wenn noch Karten im Stapel sind, kann man auch eine Ziehen!
        if ( remainingCardsInDeck > 0 ) {
            // Zufälligen Index erzeugen, welche Karte wir aus dem deck nehmen
            var index: number = Math.floor( Math.random() * remainingCardsInDeck ); //floor schneidet komma zahl weg//

            // Karte aus dem deck holen
            var card: Card = deck[index]; //Ergebnis mr*cards

            // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
            deck.splice( index, 1 );

            // Karte zurückliefern
            return card;
        }
        return null;
    }

    function mouseClickOnMyCard( _event: MouseEvent ): void {
        let divCard: HTMLElement = <HTMLElement>_event.currentTarget;
        // nicht das Target nehmen, weil wir auch geschachtelte divs haben 
        // und dann evtl das falsche HTML Element im Event liegt
        let id: string = divCard.id;

        var player: Player = getHumanPlayer();
        var card: Card = player.getCardById( id );
        if ( card != null ) {
            tryPlayCard( player, card );
        } else {
            alert( "Die Karte wurde nicht im Stapel gefunden: " + id );
        }
    }

    function mouseClickOnDeck( _event: MouseEvent ): void {
        pickAndDrawCard();
    }

    function spaceKeyPressed( _event: KeyboardEvent ): void {
        var keyCode: number = _event.keyCode;
        if ( keyCode == 32 ) {
            pickAndDrawCard();
        }
    }

    function pickAndDrawCard(): void {
        let player: Player = getHumanPlayer();
        let card: Card = pickRandomCardForPlayer( player );
        let cardDiv: HTMLElement = createCard( card );
        document.body.appendChild( cardDiv );
        cardDiv.addEventListener( "click", mouseClickOnMyCard );
        redrawMyCards();
    }

    function tryPlayCard( _player: Player, _card: Card ): void {
        var topCard: Card = getTopCard();
        if ( _card.isJoker || _card.color == topCard.color || _card.type == topCard.type ) {
            var index: number = _player.cards.indexOf( _card );
            if ( index == -1 ) {
                alert( "Fehler! Die Karte wurde nicht im Stapel des Spielers gefunden!" );
                return;
            }

            _player.cards.splice( index, 1 );
            playedCards.push( _card );

            drawPlayedCard( _card );
            redrawMyCards();

            // TODO nächster Spieler ist an der Reihe
        } else {
            alert( "Die Karte kann nicht gespielt werden!" );
        }
    }

    function sortMyCards(): void {
        var player: Player = getHumanPlayer();

        // Sortieren nach der Sort Value
        player.cards.sort( function( _a: Card, _b: Card ): number {
            return _a.sortValue - _b.sortValue;
        } );

        redrawMyCards();
    }

    function drawMyCards(): void { //kein Rückgabewert
        var player: Player = getHumanPlayer();

        for ( var i: number = 0; i < player.cards.length; i++ ) {  //so viele Karten wie auf der Hand, durchlauf
            var card: Card = player.cards[i];

            let cardDiv: HTMLDivElement = createCard( card );

            let style: CSSStyleDeclaration = cardDiv.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";

            document.body.appendChild( cardDiv ); //Karte HTML body hinzufügen

            cardDiv.addEventListener( "click", mouseClickOnMyCard );
        }
    }

    function createCard( _card: Card ): HTMLDivElement {
        //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
        let cardDiv: HTMLDivElement = document.createElement( "div" ); //document, html element erstellen typ div
        cardDiv.className = "card";
        cardDiv.id = _card.cardId;

        // <div class="bg green"></div> 
        let bg: HTMLDivElement = document.createElement( "div" );
        bg.className = "bg " + _card.color;
        cardDiv.appendChild( bg ); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt

        // <div class="circle"></div> //Ellipse der Karte hinzufügen
        let kreis: HTMLDivElement = document.createElement( "div" );
        kreis.className = "circle";
        cardDiv.appendChild( kreis ); //fügt die Ellipse dieser einen Karte hinzu 

        //  <div class="top-left">9</div> 
        let obenLinks: HTMLDivElement = document.createElement( "div" );
        obenLinks.className = "top-left";
        obenLinks.innerHTML = _card.type; //was kommt auf diese karte drauf idF Zahl
        cardDiv.appendChild( obenLinks ); //fügt die zahl oben links dieser Karte hinzu

        //  <div class="center">9</div> 
        let zentrum: HTMLDivElement = document.createElement( "div" );
        zentrum.className = "center";
        zentrum.innerHTML = _card.type; //was kommt auf diese Karte idF die Zahl zentriert
        cardDiv.appendChild( zentrum ); //fügt die Zahl zentriert dieser Karte hinzu

        // <div class="bottom-right">9</div> 
        let untenRechts: HTMLDivElement = document.createElement( "div" );
        untenRechts.className = "bottom-right";
        untenRechts.innerHTML = _card.type;
        cardDiv.appendChild( untenRechts );

        return cardDiv;
    }

    function redrawMyCards(): void {
        var player: Player = getHumanPlayer();
        for ( var i: number = 0; i < player.cards.length; i++ ) {  //so viele Karten wie auf der Hand, durchlauf
            let card: Card = player.cards[i];
            let cardDiv: HTMLElement = document.getElementById( card.cardId );

            let style: CSSStyleDeclaration = cardDiv.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";
            style.zIndex = ( i + 1 ) + "";
        }
    }

    function drawPlayedCard( _card: Card ): void {
        let cardDiv: HTMLDivElement = <HTMLDivElement>document.getElementById( _card.cardId );
        let style: CSSStyleDeclaration = cardDiv.style;
        style.left = "10px";
        style.top = "10px";
        style.zIndex = ( ++topCardZIndex ) + "";

        cardDiv.removeEventListener( "click", mouseClickOnMyCard );
    }

    //
}