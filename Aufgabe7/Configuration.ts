namespace Baum4 {

    /* Hier kann die qualifizierte Mitarbeiterin die Änderungen anpassen */
    export let dropdown: number = 0;
    export let textInput: number = 1;
    export let config: Configuration = {
        groups: [
            {
                name: "Baumart",
                type: dropdown,
                articles: [
                    {
                        name: "Nordmanntanne",
                        price: 50.00
                    },
                    {
                        name: "Fichte",
                        price: 24.99
                    }
                ]
            },
            {
                name: "Halter",
                type: dropdown,
                articles: [
                    {
                        name: "Holzhalter",
                        price: 3.99
                    },
                    {
                        name: "Metallhalter",
                        price: 14.99
                    },
                    {
                        name: "Massivgoldhalter",
                        price: 749.99
                    }
                ]
            },
            {
                name: "Schmuck",
                type: textInput,
                articles: [
                    {
                        name: "Lametta blau 50 Streifen",
                        price: 2.99
                    },
                    {
                        name: "Lametta grün 50 Streifen",
                        price: 2.99
                    },
                    {
                        name: "Lametta bunt 200 Streifen",
                        price: 5.99
                    }
                ]
            },
            {
                name: "Kerzen",
                type: textInput,
                articles: [
                    {
                        name: "Kerze rot",
                        price: 1.49
                    },
                    {
                        name: "Kerze weiß",
                        price: 1.49
                    }
                ]
            }
        ],
        deliveryTypes: [
            {
                name: "DHL",
                price: 5.40
            },
            {
                name: "Hermes",
                price: 4.40
            }
        ]
    };

    /* Aufgabe 4.3 */
    export interface Configuration {
        groups: Group[];
        deliveryTypes: DeliveryType[];
    }

    export interface DeliveryType {
        name: string;
        price: number;
    }

    /* Aufgabe 5 - Group sind Produktkategorien */
    export interface Group {
        name: string;
        type: number;
        articles: Article[];
    }

    export interface Article {
        name: string;
        price: number;
    }
}