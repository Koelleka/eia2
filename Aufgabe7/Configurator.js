var Baum4;
(function (Baum4) {
    document.addEventListener("DOMContentLoaded", start);
    function start() {
        console.log("start called");
        generateForm();
        updateOrderSummary(null);
        document.getElementById("checkButton").addEventListener("click", checkOrder);
        document.getElementById("submitButton").addEventListener("click", submitOrder);
    }
    function generateForm() {
        console.log("generateForm called");
        for (var i = 0; i < Baum4.config.groups.length; i++) {
            var group = Baum4.config.groups[i];
            var groupDiv = document.createElement("div");
            groupDiv.className = "group";
            var groupNameH2 = document.createElement("h2");
            groupNameH2.innerText = group.name;
            groupDiv.appendChild(groupNameH2);
            if (group.type == Baum4.dropdown) {
                var articleSelect = document.createElement("select");
                articleSelect.className = "articleInput";
                articleSelect.name = group.name;
                for (var j = 0; j < group.articles.length; j++) {
                    var article = group.articles[j];
                    var articleOption = document.createElement("option");
                    articleOption.text = article.name + " " + article.price + " EUR";
                    articleOption.value = article.price + "";
                    articleSelect.appendChild(articleOption);
                }
                groupDiv.appendChild(articleSelect);
                articleSelect.addEventListener("change", updateOrderSummary);
            }
            else if (group.type == Baum4.textInput) {
                for (j = 0; j < group.articles.length; j++) {
                    article = group.articles[j];
                    var articleDiv = document.createElement("div");
                    articleDiv.className = "article";
                    groupDiv.appendChild(articleDiv);
                    var articleNameDiv = document.createElement("div");
                    articleNameDiv.className = "articleName";
                    articleNameDiv.innerText = article.name;
                    articleDiv.appendChild(articleNameDiv);
                    var articlePriceDiv = document.createElement("div");
                    articlePriceDiv.className = "articlePrice";
                    articlePriceDiv.innerText = article.price + " EUR";
                    articleDiv.appendChild(articlePriceDiv);
                    var articleAmountInput = document.createElement("input");
                    articleAmountInput.className = "articleInput";
                    articleAmountInput.name = article.name;
                    articleAmountInput.type = "number";
                    articleAmountInput.setAttribute("data-price", article.price + "");
                    articleAmountInput.setAttribute("data-name", article.name);
                    articleDiv.appendChild(articleAmountInput);
                    articleAmountInput.addEventListener("change", updateOrderSummary);
                }
            }
            else {
                alert("Ungültige Konfiguration!");
                // Ungültig, das sollte nicht vorkommen
            }
            var articleSelectionDiv = document.getElementById("articles");
            articleSelectionDiv.appendChild(groupDiv);
        }
        var deliveryTypeSelect = document.getElementById("deliveryType");
        for (i = 0; i < Baum4.config.deliveryTypes.length; i++) {
            var deliveryType = Baum4.config.deliveryTypes[i];
            var deliveryTypeOption = document.createElement("option");
            deliveryTypeOption.text = deliveryType.name + " (" + deliveryType.price + " EUR)";
            deliveryTypeOption.value = deliveryType.price + "";
            deliveryTypeSelect.appendChild(deliveryTypeOption);
        }
        // Wenn die Lieferart sich ändert, dann wird der Preis aktualisiert
        deliveryTypeSelect.addEventListener("change", updateOrderSummary);
    }
    function updateOrderSummary(_event) {
        console.log("updateOrderSummary called");
        var inputs = document.getElementsByClassName("articleInput");
        var sum = 0;
        var orderSummaryList = [];
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.tagName == "SELECT") {
                var selectElement = inputs[i];
                var name = selectElement.options[selectElement.selectedIndex].innerHTML;
                sum += Number(selectElement.value);
                orderSummaryList.push(name);
            }
            else {
                var amount = Number(input.value);
                var price = Number(input.getAttribute("data-price"));
                name = input.getAttribute("data-name");
                var tempPrice = amount * price;
                sum += tempPrice;
                tempPrice = Math.round(tempPrice * 100) / 100;
                if (amount > 0) {
                    orderSummaryList.push(name + " " + tempPrice + " EUR");
                }
            }
        }
        var deliveryTypeSelect = document.getElementById("deliveryType");
        var value = deliveryTypeSelect.options[deliveryTypeSelect.selectedIndex].value;
        var deliveryPrice = Number(value);
        sum += deliveryPrice;
        orderSummaryList.push("Versand " + value + " EUR");
        sum = Math.round(sum * 100) / 100; // auf 2 Nachkommastellen runden
        var liveSum = document.getElementById("liveSum");
        liveSum.innerText = sum + " EUR";
        var ul = document.getElementById("orderSummaryList");
        ul.innerHTML = "";
        for (i = 0; i < orderSummaryList.length; i++) {
            var li = document.createElement("li");
            li.innerText = orderSummaryList[i];
            ul.appendChild(li);
        }
    }
    function checkOrder(_event) {
        console.log("checkOrder called");
        var inputs = document.getElementsByClassName("required");
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.value == null || input.value == "") {
                alert("Die Bestellung ist ungültig! Bitte füllen Sie alle Kontaktfelder aus!");
                return false;
            }
        }
        return true;
    }
    /* Aufgabe 6.4 */
    function submitOrder(_event) {
        console.log("submitOrder called");
        if (!checkOrder(_event)) {
            return;
        }
        var form = document.getElementById("orderForm");
        sendRequestWithCustomData(form);
    }
    /* Aufgabe 6.4 */
    function sendRequestWithCustomData(_form) {
        var queryString = "?";
        for (var i = 0; i < _form.elements.length; i++) {
            var element = _form.elements[i];
            if (element instanceof HTMLInputElement) {
                var inputElement = element;
                queryString += inputElement.name + "=" + inputElement.value;
            }
            else if (element instanceof HTMLSelectElement) {
                var selectElement = element;
                queryString += selectElement.name + "=" + selectElement.value;
            }
            queryString += "&";
        }
        // & Symbole am Ende entfernen
        while (queryString.charAt(queryString.length - 1) == "&") {
            queryString = queryString.slice(0, -1);
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", _form.action + queryString, true);
        xhr.addEventListener("readystatechange", handleStateChange);
        xhr.send();
    }
    /* Aufgabe 6.4 */
    function handleStateChange(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            /* Aufgabe 7.1 */
            //alert( "response from server: " + xhr.response );
            /* Aufgabe 7.2 / Bonusaufgabe */
            // Auf dem Server haben wir aus dem Objekt ein JSON gemacht
            // Auf dem Client wollen wir aus dem JSON wieder ein Objekt machen
            // JSON.parse erstellt ein JS Objekt aus einem Json String
            var responseString = xhr.response;
            console.log(responseString);
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            var responseObj = new Map(JSON.parse(responseString));
            console.log(responseObj);
            // Das Ergebnis stellen wir unter der Bestellung dar
            var container = document.getElementById("responseContainer");
            container.innerHTML = "";
            // Für die JS Map gibt es die forEach Methode zum jedes Element zu durchlaufen
            // Das ist wie eine for Schleife, nur das wir eine anonyme funktion als parameter übergeben
            // Die Funktion wird für jedes Paar in der Map aufsgeführt
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
            responseObj.forEach((value, key) => {
                console.log(key, value);
                var divElement = document.createElement("div");
                divElement.innerText = key + ": " + value;
                container.appendChild(divElement);
            });
        }
    }
})(Baum4 || (Baum4 = {}));
//# sourceMappingURL=Configurator.js.map