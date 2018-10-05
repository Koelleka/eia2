/**
Aufgabe: 0
Name: Katharina Kölle
Matrikel: 259439 
Datum: 06.10.2018
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
**/

namespace a0{
    
    var name:string ="";
    function eingabe(){
        var name = prompt ("Bitte gib deinen Namen ein");
        var node:any= document.getElementById("inhalt");
        var nachricht = "Hallo " + name + "! Herzlich willkommen :)";
        node.innerHTML = nachricht;
        console.log(nachricht);
       }
        
document.addEventListener('DOMContentLoaded',eingabe);
}