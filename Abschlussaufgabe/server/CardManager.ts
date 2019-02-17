
export class GameCard {
    public id: number;
    public color: string;
    public type: string;
    public isJoker: boolean;
}

export class CardManager {
    private static _instance: CardManager;
    public cards: GameCard[];

    private constructor() {
        this.cards = [];
        this.initCards();
    }

    private initCards(): void {
        let cardColors: string[] = ["red", "blue", "green", "yellow"];
        let actionCards: string[] = ["+2", "<>", "A"]; // 12 stk / 2 pro Farbe / A = Aussetzen
        let jokerCards: string[] = ["FW", "+4"]; // 4 pro Joker FW = Farbe wählen
        let numberCards: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        this.cards = [];
        var counter: number = 0;
        for ( var i: number = 0; i < cardColors.length; i++ ) { //äußere for-schleife läuft 4x durch
            var color: string = cardColors[i];

            // Aktionskarten
            for ( var j: number = 0; j < 2; j++ ) {
                for ( var k: number = 0; k < actionCards.length; k++ ) {
                    var type: string = actionCards[k];
                    var card: GameCard = new GameCard();
                    card.id = counter++;
                    card.color = color;
                    card.type = type;
                    this.cards.push( card );
                }
            }

            // Zahlenkarten
            for ( j = 0; j < 4; j++ ) {
                for ( k = 0; k < numberCards.length; k++ ) {
                    type = numberCards[k];
                    card = new GameCard();
                    card.id = counter++;
                    card.color = color;
                    card.type = type;
                    this.cards.push( card );
                }
            }
        }

        // Jokerkarten
        for ( i = 0; i < 4; i++ ) {
            for ( j = 0; j < jokerCards.length; j++ ) {
                type = jokerCards[j];
                card = new GameCard();
                card.id = counter++;
                card.type = type;
                card.isJoker = true;
                this.cards.push( card );
            }
        }
    }

    public getCard( _id: number ): GameCard {
        for ( var i: number = 0; i < this.cards.length; i++ ) {
            if ( this.cards[i].id == _id )
                return this.cards[i];
        }
    }

    // https://stackoverflow.com/a/36978360
    public static get Instance(): CardManager {
        return this._instance || ( this._instance = new this() );
    }
}