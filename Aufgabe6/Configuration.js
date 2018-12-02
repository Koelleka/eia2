var Baum3;
(function (Baum3) {
    /* Hier kann die qualifizierte Mitarbeiterin die Änderungen anpassen */
    Baum3.dropdown = 0;
    Baum3.textInput = 1;
    Baum3.config = {
        groups: [
            {
                name: "Baumart",
                type: Baum3.dropdown,
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
                type: Baum3.dropdown,
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
                type: Baum3.textInput,
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
                type: Baum3.textInput,
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
})(Baum3 || (Baum3 = {}));
//# sourceMappingURL=Configuration.js.map