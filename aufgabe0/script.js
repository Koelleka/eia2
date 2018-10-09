/**
Aufgabe: 0
Name: Katharina Kölle
Matrikel: 259439
Datum: 06.10.2018
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
**/
var a0;
(function (a0) {
    function eingabe() {
        var name = prompt("Bitte gib deinen Namen ein");
        var nachricht = "Hallo " + name + "! Herzlich willkommen :)";
        document.getElementById("inhalt").innerHTML = nachricht;
        console.log(nachricht);
    }
    document.addEventListener('DOMContentLoaded', eingabe);
})(a0 || (a0 = {}));
//# sourceMappingURL=script.js.map