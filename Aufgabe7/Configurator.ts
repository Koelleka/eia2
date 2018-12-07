namespace Baum4 {
    document.addEventListener( "DOMContentLoaded", start );

    function start(): void {
        console.log( "start called" );
        generateForm();
        updateOrderSummary( null );

        document.getElementById( "checkButton" ).addEventListener( "click", checkOrder );
        document.getElementById( "submitButton" ).addEventListener( "click", submitOrder );
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
                articleSelect.name = group.name;

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
                    articleAmountInput.name = article.name;
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

    function checkOrder( _event: Event ): boolean {
        console.log( "checkOrder called" );
        var inputs: HTMLCollectionOf<Element> = document.getElementsByClassName( "required" );
        for ( var i: number = 0; i < inputs.length; i++ ) {
            var input: HTMLInputElement = <HTMLInputElement>inputs[i];
            if ( input.value == null || input.value == "" ) {
                alert( "Die Bestellung ist ungültig! Bitte füllen Sie alle Kontaktfelder aus!" );
                return false;
            }
        }
        return true;
    }

    /* Aufgabe 6.4 */
    function submitOrder( _event: Event ): void {
        console.log( "submitOrder called" );
        if ( !checkOrder( _event ) ) {
            return;
        }

        var form: HTMLFormElement = <HTMLFormElement>document.getElementById( "orderForm" );
        sendRequestWithCustomData( form );
    }

    /* Aufgabe 6.4 */
    function sendRequestWithCustomData( _form: HTMLFormElement ): void {

        var queryString: string = "?";
        for ( var i: number = 0; i < _form.elements.length; i++ ) {
            var element: Element = _form.elements[i];
            if ( element instanceof HTMLInputElement ) {
                var inputElement: HTMLInputElement = <HTMLInputElement>element;
                queryString += inputElement.name + "=" + inputElement.value;
            } else if ( element instanceof HTMLSelectElement ) {
                var selectElement: HTMLSelectElement = <HTMLSelectElement>element;
                queryString += selectElement.name + "=" + selectElement.value;
            }
            queryString += "&";
        }

        // & Symbole am Ende entfernen
        while ( queryString.charAt( queryString.length - 1 ) == "&" ) {
            queryString = queryString.slice( 0, -1 )
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open( "GET", _form.action + queryString, true );
        xhr.addEventListener( "readystatechange", handleStateChange );
        xhr.send();
    }

    /* Aufgabe 6.4 */
    function handleStateChange( _event: ProgressEvent ): void {
        var xhr: XMLHttpRequest = ( <XMLHttpRequest>_event.target );
        if ( xhr.readyState == XMLHttpRequest.DONE ) {
            /* Aufgabe 7.1 */
            //alert( "response from server: " + xhr.response );

            /* Aufgabe 7.2 / Bonusaufgabe */
            // Auf dem Server haben wir aus dem Objekt ein JSON gemacht
            // Auf dem Client wollen wir aus dem JSON wieder ein Objekt machen
            // JSON.parse erstellt ein JS Objekt aus einem Json String
            var responseString: string = xhr.response;
            console.log( responseString );
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            var responseObj: Map<string, string> = new Map( JSON.parse( responseString ) );
            console.log( responseObj );

            // Das Ergebnis stellen wir unter der Bestellung dar
            var container: HTMLDivElement = <HTMLDivElement>document.getElementById( "responseContainer" );
            container.innerHTML = "";

            // Für die JS Map gibt es die forEach Methode zum jedes Element zu durchlaufen
            // Das ist wie eine for Schleife, nur das wir eine anonyme funktion als parameter übergeben
            // Die Funktion wird für jedes Paar in der Map aufsgeführt
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
            responseObj.forEach(( value: string, key: string ) => {
                console.log( key, value );

                var divElement: HTMLDivElement = document.createElement( "div" );
                divElement.innerText = key + ": " + value;
                container.appendChild( divElement );
            } );


        }
    }
}