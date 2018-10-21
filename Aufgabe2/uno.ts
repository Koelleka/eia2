namespace uno {

    // Mit den Infos bauen wir später alle Karten die es gibt
    let farben: string[] = ["red", "blue", "green", "yellow"];
    let aktionsKarten: string[] = ["+2", "<>", "A"]; // 8 stk / 2 pro Farbe
    let jokerKarten: string[] = ["FW", "+4"]; // 4 pro Joker
    let zahlenKarten: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Alle noch verfügbaren Karten im Spiel
    var kartendeck: Karte[];
    // Karten auf meine Hand
    var meineKarten: Karte[];

    // Eine Hilfsklasse um eine Karte zu beschreiben (farbe + art)
    class Karte {
        farbe: string;
        art: string;

        constructor( _farbe: string, _art: string ) {
            this.farbe = _farbe;
            this.art = _art;
        }
    }

    // Spiel initialisieren
    function start(): void {
        var str: string = prompt( "Bitte die Spielkartenanzahl auswählen: ", "5" );
        var anzahl: number = Number( str );

        erzeugeAlleKarten();
        meineKarten = [];

        for ( var i: number = 0; i < anzahl; i++ ) {
            zufallskarteZiehen();
        }

        meineKartenZeichnen();
    }

    function erzeugeAlleKarten(): void {
        kartendeck = [];
        for ( var i: number = 0; i < farben.length; i++ ) {
            var farbe: string = farben[i];

            // Aktionskarten
            for ( var j: number = 0; j < 2; j++ ) {
                for ( var k: number = 0; k < aktionsKarten.length; k++ ) {
                    var art: string = aktionsKarten[k];
                    var karte: Karte = new Karte( farbe, art );
                    kartendeck.push( karte );
                }
            }

            // Zahlenkarten
            for ( j = 0; j < 4; j++ ) {
                for ( k = 0; k < zahlenKarten.length; k++ ) {
                    art = zahlenKarten[k];
                    karte = new Karte( farbe, art );
                    kartendeck.push( karte );
                }
            }
        }

        // Jokerkarten
        for ( i = 0; i < 4; i++ ) {
            for ( j = 0; j < jokerKarten.length; j++ ) {
                art = jokerKarten[j];
                karte = new Karte( farbe, art );
                kartendeck.push( karte );
            }
        }
    }

    function zufallskarteZiehen(): void {
        console.log( "Hello" );

        // Anzahl verbleibender Karten im Kartendeck
        var anzahlVerbleibenderKartenImStapel: number = kartendeck.length;

        // Zufälligen Index erzeugen, welche Karte wir aus dem kartendeck nehmen
        var index: number = Math.floor( Math.random() * anzahlVerbleibenderKartenImStapel );

        // Karte aus dem Kartendeck holen
        var karte: Karte = kartendeck[index];

        // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
        kartendeck.splice( index, 1 );

        meineKarten.push( karte );
    }

    function meineKartenZeichnen(): void {

        for ( var i: number = 0; i < meineKarten.length; i++ ) {
            var karte: Karte = meineKarten[i];

            //<div class="card"> 
            let card: HTMLDivElement = document.createElement( "div" );
            card.className = "card";

            // <div class="bg green"></div> 
            let bg: HTMLDivElement = document.createElement( "div" );
            bg.className = "bg " + karte.farbe;
            card.appendChild( bg );

            // <div class="circle"></div> 
            let kreis: HTMLDivElement = document.createElement( "div" );
            kreis.className = "circle";
            card.appendChild( kreis );

            //  <div class="top-left">9</div> 
            let obenLinks: HTMLDivElement = document.createElement( "div" );
            obenLinks.className = "top-left";
            obenLinks.innerHTML = karte.art;
            card.appendChild( obenLinks );

            //  <div class="center">9</div> 
            let zentrum: HTMLDivElement = document.createElement( "div" );
            zentrum.className = "center";
            zentrum.innerHTML = karte.art;
            card.appendChild( zentrum );

            // <div class="bottom-right">9</div> 
            let untenRechts: HTMLDivElement = document.createElement( "div" );
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = karte.art;
            card.appendChild( untenRechts );

            let style: CSSStyleDeclaration = card.style;
            style.left = 10 + i * 80 + "px";
            style.bottom = "10px";

            document.body.appendChild( card );
        }
    }

    document.addEventListener( "DOMContentLoaded", start );
}