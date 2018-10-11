/**
Aufgabe: 0
Name: Katharina Kölle
Matrikel: 259439 
Datum: 06.10.2018
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
**/

namespace a0 {

    function eingabe(): void {
        var name: string = prompt( "Bitte gib deinen Namen ein" );
        var nachricht: string = "Hallo " + name + "! Herzlich willkommen :)";
        document.getElementById( "inhalt" ).innerHTML = nachricht;
        console.log( nachricht );
    }

    document.addEventListener( "DOMContentLoade", eingabe );
}