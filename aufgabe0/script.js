/**
Aufgabe: 0
Name: Katharina Kölle
Matrikel: 259439
Datum: 06.10.2018
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
**/
var a0;
(function (a0) {
    var name = "";
    function eingabe() {
        var name = prompt("Bitte gib deinen Namen ein");
        var node = document.getElementById("inhalt");
        var nachricht = "Hallo " + name + "! Herzlich willkommen :)";
        node.innerHTML = nachricht;
        console.log(nachricht);
    }
    document.addEventListener('DOMContentLoaded', eingabe);
})(a0 || (a0 = {}));
//# sourceMappingURL=script.js.map