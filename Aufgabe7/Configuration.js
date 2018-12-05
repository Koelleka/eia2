var Baum4;
(function (Baum4) {
    /* Hier kann die qualifizierte Mitarbeiterin die Änderungen anpassen */
    Baum4.dropdown = 0;
    Baum4.textInput = 1;
    Baum4.config = {
        groups: [
            {
                name: "Baumart",
                type: Baum4.dropdown,
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
                type: Baum4.dropdown,
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
                type: Baum4.textInput,
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
                type: Baum4.textInput,
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
})(Baum4 || (Baum4 = {}));
//# sourceMappingURL=Configuration.js.map