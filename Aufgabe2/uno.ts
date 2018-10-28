namespace uno {

    // Mit den Infos bauen wir später alle Karten die es gibt

    //alle Farben die es gibt 
    let cardColors: string[] = ["red", "blue", "green", "yellow"];

    //Alle vorhandenen Aktionskarten ges. Spiel
    let actionCards: string[] = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
    let jokerCards: string[] = ["FW", "+4"]; // 4 pro Joker FW = Farbe wählen
    let numberCards: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Alle noch verfügbaren Karten im Spiel
    var deck: Card[];
    // Karten auf meine Hand
    var myCards: Card[];

    // Eine Klasse um eine Karte zu beschreiben (farbe + art)
    class Card {
        color: string;
        value: string;

        constructor( _farbe: string, _art: string ) {
            this.color = _farbe; //this=zugriff auf "farbe, art"
            this.value = _art; //this=Eigenreferenz 
        }
    }

    // Spiel initialisieren
    function start(): void {
        //promt=Eingabefenster
        var input: string = prompt( "Bitte die Spielkartenanzahl auswählen: ", "5" );
        var anzahl: number = Number( input );

        createAllCards(); //Funktionsaufruf
        myCards = [];

        for ( var i: number = 0; i < anzahl; i++ ) { //5x=5 6=6 100=100
            pickRandomCard(); //Funktionsaufruf
        }

        drawMyCards(); //Funktionsaufruf
    }

    function createAllCards(): void { //kein Rückgabewert
        deck = [];
        for ( var i: number = 0; i < cardColors.length; i++ ) { //äußere for-schleife läuft 4x durch
            var color: string = cardColors[i];

            // Aktionskarten
            for ( var j: number = 0; j < 2; j++ ) { //2 von jeder Farbe
                for ( var k: number = 0; k < actionCards.length; k++ ) { //3
                    var art: string = actionCards[k];
                    var karte: Card = new Card( color, art ); //constructor 
                    deck.push( karte ); //karte wird auf den stapel gelegt 
                }
            }

            // Zahlenkarten
            for ( j = 0; j < 4; j++ ) { //4 von jeder Farbe
                for ( k = 0; k < numberCards.length; k++ ) {
                    art = numberCards[k];
                    karte = new Card( color, art );
                    deck.push( karte );
                }
            }
        }

        // Jokerkarten
        for ( i = 0; i < 4; i++ ) {
            for ( j = 0; j < jokerCards.length; j++ ) {
                art = jokerCards[j];
                karte = new Card( null, art );
                deck.push( karte );
            }
        }
    }

    function pickRandomCard(): void { //Deklaration

        // Anzahl verbleibender Karten im deck
        let remainingCardsInDeck: number = deck.length;

        // Zufälligen Index erzeugen, welche Karte wir aus dem deck nehmen
        var index: number = Math.floor( Math.random() * remainingCardsInDeck ); //floor schneidet komma zahl weg//

        // Karte aus dem deck holen
        var card: Card = deck[index];

        // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
        deck.splice( index, 1 );

        myCards.push( card ); //karte wird auf "meinen Stapel gelegt
    }

    function drawMyCards(): void { //kein Rückgabewert

        for ( var i: number = 0; i < myCards.length; i++ ) {  //so viele Karten wie auf der Hand, durchlauf
            var tmpCard: Card = myCards[i];

            //<div class="card">  //erzeugen vonHTMLtags, karten anzeigen
            let card: HTMLDivElement = document.createElement( "div" ); //document, html element erstellen typ div
            card.className = "card";

            // <div class="bg green"></div> 
            let bg: HTMLDivElement = document.createElement( "div" );
            bg.className = "bg " + tmpCard.color;
            card.appendChild( bg ); //fügt den hintergrund dieser Karte hinzu - verschachtelt angefügt

            // <div class="circle"></div> //Ellipse der Karte hinzufügen
            let kreis: HTMLDivElement = document.createElement( "div" );
            kreis.className = "circle";
            card.appendChild( kreis ); //fügt die Ellipse dieser einen Karte hinzu 

            //  <div class="top-left">9</div> 
            let obenLinks: HTMLDivElement = document.createElement( "div" );
            obenLinks.className = "top-left";
            obenLinks.innerHTML = tmpCard.value; //was kommt auf diese karte drauf idF Zahl
            card.appendChild( obenLinks ); //fügt die zahl oben links dieser Karte hinzu

            //  <div class="center">9</div> 
            let zentrum: HTMLDivElement = document.createElement( "div" );
            zentrum.className = "center";
            zentrum.innerHTML = tmpCard.value; //was kommt auf diese Karte idF die Zahl zentriert
            card.appendChild( zentrum ); //fügt die Zahl zentriert dieser Karte hinzu

            // <div class="bottom-right">9</div> 
            let untenRechts: HTMLDivElement = document.createElement( "div" );
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = tmpCard.value;
            card.appendChild( untenRechts );

            let style: CSSStyleDeclaration = card.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";

            document.body.appendChild( card ); //Karte HTML body hinzufügen
        }
    }

    document.addEventListener( "DOMContentLoaded", start ); //
}