import * as Http from "http"; // Importiert alle Funktionen vom modul "http", das http Modul ist in der node.d.ts definiert

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

        /* Alt Antwort wird die Url, von der die Anfrage kommt, in den Response Body geschrieben. */
        _response.write( _request.url );

        /* Ende der Anfrage / Response Stream wird geschlossen */
        _response.end();
    }
}