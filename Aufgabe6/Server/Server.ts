import * as Http from "http";
//import Http = require( 'http' );
/*Importiert alle Funktionen vom modul "httpdas
 * http Modul ist in der node.d.ts definiert */

namespace Server {
    console.log( "Starting server" ); // Konsolenausgabe
    /* process kommt von NodeJS (env steht für environment, also Umgebung)
     * Einfacher ausgefrückt sind Umgebungsvariablen von Node in process.env gespeichert */
    let port: number = process.env.PORT;
    /* Wenn kein Port definiert worden ist, oder keine Node Umgebung vorhanden ist,
     * dann soll der port 8100 verwendet werden.
     * (Wenn port == undefiniert, dann setze port auf 8100) */
    if ( port == undefined )
        port = 8100;

    let server: Http.Server = Http.createServer(); // Erzeugt einen HTTP Server
    server.addListener( "request", handleRequest ); // Event Listener für das Event "request" hinzufügen
    server.addListener( "listening", handleListen ); // Event Listener für das Event "listening" hinzufügen
    server.listen( port ); // Der Http Server soll auf dem port "port" lauschen

    function handleListen(): void {
        console.log( "Listening" ); // Konsolenausgabe

    }

    /* Die "handleRequest" Methode handelt eine Anfrage, welche beim Server rein kommt.
     * _request beinhaltet die Nachrichtenanfrage, also das was rein kommt
     * _response ist das Objekt mit dem man die Antwort zurück schreibt */
    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        console.log( "I hear voices!" ); // Konsolenausgabe

        /* Das Http Protokoll besteht aus Header und Body.
         * In den Headern stehen Informationen zur Anfrage bzw zur Antwort drin. 
         * Setzt den Header für "content-type" auf utf8, UTF-8 Text-Encoding (Zeichencodierung) */
        _response.setHeader( "content-type", "text/html; charset=utf-8" );
        /* Setzt den header für "Access-Control-Allow-Origin" auf "*"
         * Diesen Header verwendet man, um den Zugriff von allen Quellen zu erlauben.
         * Wird oft für das CORS Protokoll verwendet */
        _response.setHeader( "Access-Control-Allow-Origin", "*" );

        /* Leerzeuchen werden mit %20 ersetzt beim Senden der Anfrage. 
         * Das müssen wir rückgängig machen */
        var decodedUrl: string = decodeURI( _request.url );
        /* Erst splitten wir das ? vor dem Query String, dann die Parameter mit = */
        var requestUrlParts: string[] = decodedUrl.split( "?" );
        if ( requestUrlParts.length == 2 ) {
            var queryString: string = requestUrlParts[1];
            var parameterPairs: string[] = queryString.split( "&" );
            /* Als assoziatives Array können wir die Map verwenden oder any */
            var requestObj: Map<string, string> = new Map<string, string>();
            for ( var i: number = 0; i < parameterPairs.length; i++ ) {
                var parameterPair: string[] = parameterPairs[i].split( "=" );
                var parameterName: string = parameterPair[0];
                var parameterValue: string = parameterPair[1];
                requestObj.set( parameterName, parameterValue );
            }

            /* Map hat eine Iterationsfunktion eingebaut */
            /* Code von Aufgabe 7.1 */
            // var responseText: string = "Bestellzusammenfassung:\n";
            // requestObj.forEach(( value, key ) => {
            //    // Für jedes Element in der Map wird das ausgeführt 
            //    responseText += key + ": " + value + "\n";
            //} );

            /* Code von Aufgabe 7.2 */
            // http://2ality.com/2015/08/es6-map-json.html
            // https://basarat.gitbooks.io/typescript/docs/spread-operator.html
            // Die 3 Punkte sind der prefixing Operator, die Map wird quasi auseinander 
            // gebaut und die einzelnen Key Value Paare als Parameter übergeben
            var responseJson: string = JSON.stringify( [...requestObj] );
            _response.write( responseJson );
        } else {
            _response.write( "Ungültige Antrage" );
        }

        /* Ende der Anfrage / Response Stream wird geschlossen */
        _response.end();
    }
}