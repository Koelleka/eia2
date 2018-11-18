namespace Baum {
    document.addEventListener( "DOMContentLoaded", start );

    function start(): void {
        console.log( "start called" );
        generateForm();
        updateOrderSummary( null );

        document.getElementById( "checkButton" ).addEventListener( "click", checkOrder );
    }

    function generateForm(): void {
        console.log( "generateForm called" );

        for ( var i: number = 0; i < config.groups.length; i++ ) {
            var group: Group = config.groups[i];
            var groupDiv: HTMLDivElement = document.createElement( "div" );
            groupDiv.className = "group";

            var groupNameH2: HTMLElement = document.createElement( "h2" );
            groupNameH2.innerText = group.name;
            groupDiv.appendChild( groupNameH2 );


            if ( group.type == dropdown ) {
                var articleSelect: HTMLSelectElement = <HTMLSelectElement>document.createElement( "select" );
                articleSelect.className = "articleInput";

                for ( var j: number = 0; j < group.articles.length; j++ ) {
                    var article: Article = group.articles[j];

                    var articleOption: HTMLOptionElement = document.createElement( "option" );
                    articleOption.text = article.name + " " + article.price + " EUR";
                    articleOption.value = article.price + "";

                    articleSelect.appendChild( articleOption );
                }

                groupDiv.appendChild( articleSelect );
                articleSelect.addEventListener( "change", updateOrderSummary );

            } else if ( group.type == textInput ) {
                for ( j = 0; j < group.articles.length; j++ ) {
                    article = group.articles[j];
                    var articleDiv: HTMLDivElement = document.createElement( "div" );
                    articleDiv.className = "article";
                    groupDiv.appendChild( articleDiv );

                    var articleNameDiv: HTMLDivElement = document.createElement( "div" );
                    articleNameDiv.className = "articleName";
                    articleNameDiv.innerText = article.name;
                    articleDiv.appendChild( articleNameDiv );

                    var articlePriceDiv: HTMLDivElement = document.createElement( "div" );
                    articlePriceDiv.className = "articlePrice";
                    articlePriceDiv.innerText = article.price + " EUR";
                    articleDiv.appendChild( articlePriceDiv );

                    var articleAmountInput: HTMLInputElement = document.createElement( "input" );
                    articleAmountInput.className = "articleInput";
                    articleAmountInput.type = "number";
                    articleAmountInput.setAttribute( "data-price", article.price + "" );
                    articleAmountInput.setAttribute( "data-name", article.name );
                    articleDiv.appendChild( articleAmountInput );

                    articleAmountInput.addEventListener( "change", updateOrderSummary );
                }
            } else {
                alert( "Ungültige Konfiguration!" );
                // Ungültig, das sollte nicht vorkommen
            }

            var articleSelectionDiv: HTMLElement = document.getElementById( "articles" );
            articleSelectionDiv.appendChild( groupDiv );
        }

        // Dieser Teil ist nicht im UML und sollte noch mit aufgenommen werden
        var deliveryTypeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById( "deliveryType" );
        for ( i = 0; i < config.deliveryTypes.length; i++ ) {
            var deliveryType: DeliveryType = config.deliveryTypes[i];
            var deliveryTypeOption: HTMLOptionElement = document.createElement( "option" );
            deliveryTypeOption.text = deliveryType.name + " (" + deliveryType.price + " EUR)";
            deliveryTypeOption.value = deliveryType.price + "";

            deliveryTypeSelect.appendChild( deliveryTypeOption );
        }
        // Wenn die Lieferart sich ändert, dann wird der Preis aktualisiert
        deliveryTypeSelect.addEventListener( "change", updateOrderSummary );
    }

    function updateOrderSummary( _event: Event ): void {
        console.log( "updateOrderSummary called" );
        var inputs: HTMLCollectionOf<Element> = document.getElementsByClassName( "articleInput" );
        var sum: number = 0;
        var orderSummaryList: string[] = [];
        for ( var i: number = 0; i < inputs.length; i++ ) {
            var input: HTMLInputElement = <HTMLInputElement>inputs[i];
            if ( input.tagName == "SELECT" ) {
                var selectElement: HTMLSelectElement = <HTMLSelectElement>inputs[i];
                var name: string = selectElement.options[selectElement.selectedIndex].innerHTML;
                sum += Number( selectElement.value );
                orderSummaryList.push( name );
            } else {
                var amount: number = Number( input.value );
                var price: number = Number( input.getAttribute( "data-price" ) );
                name = input.getAttribute( "data-name" );
                var tempPrice: number = amount * price;
                sum += tempPrice;

                tempPrice = Math.round( tempPrice * 100 ) / 100;

                if ( amount > 0 ) {
                    orderSummaryList.push( name + " " + tempPrice + " EUR" );
                }
            }
        }

        var deliveryTypeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById( "deliveryType" );
        var value: string = deliveryTypeSelect.options[deliveryTypeSelect.selectedIndex].value;
        var deliveryPrice: number = Number( value );
        sum += deliveryPrice;

        orderSummaryList.push( "Versand " + value + " EUR" );

        sum = Math.round( sum * 100 ) / 100; // auf 2 Nachkommastellen runden

        var liveSum: HTMLElement = document.getElementById( "liveSum" );
        liveSum.innerText = sum + " EUR";

        var ul: HTMLElement = document.getElementById( "orderSummaryList" );
        ul.innerHTML = "";
        for ( i = 0; i < orderSummaryList.length; i++ ) {
            var li: HTMLElement = document.createElement( "li" );
            li.innerText = orderSummaryList[i];
            ul.appendChild( li );
        }
    }

    function checkOrder( _event: Event ): void {
        console.log( "checkOrder called" );
        var inputs: HTMLCollectionOf<Element> = document.getElementsByClassName( "required" );
        for ( var i: number = 0; i < inputs.length; i++ ) {
            var input: HTMLInputElement = <HTMLInputElement>inputs[i];
            if ( input.value == null || input.value == "" ) {
                alert( "Die Bestellung ist ungültig! Bitte füllen Sie alle Kontaktfelder aus!" );
                return; // oder break das ist egal in dem Fall
            }
        }
        alert( "Die Bestellung ist okay!" );
    }
}