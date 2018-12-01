declare namespace Uno2 {
    class Card {
        color: string;
        type: string;
        isJoker: boolean;
        sortValue: number;
        cardId: string;
        constructor(_color: string, _type: string, _value: number, _isJoker: boolean, _id: number);
    }
    class Player {
        name: string;
        cards: Card[];
        constructor(_name: string);
        getCardById(_id: string): Card;
    }
}
