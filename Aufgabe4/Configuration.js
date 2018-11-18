var Baum;
(function (Baum) {
    /* Hier kann die qualifizierte Mitarbeiterin die Änderungen anpassen */
    /* Aufgabe 4.3 */
    Baum.dropdown = 0;
    Baum.textInput = 1;
    Baum.config = {
        groups: [
            {
                name: "Baumart",
                type: Baum.dropdown,
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
                name: "Schmuck",
                type: Baum.textInput,
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
                type: Baum.textInput,
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
})(Baum || (Baum = {}));
//# sourceMappingURL=Configuration.js.map