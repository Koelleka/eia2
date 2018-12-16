"use strict";
/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
console.log("Server starting");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    let query = Url.parse(_request.url, true).query;
    var command = query["command"];
    switch (command) {
        case "insert":
            let student = {
                name: query["name"],
                firstname: query["firstname"],
                matrikel: parseInt(query["matrikel"])
            };
            Database.insert(student);
            respond(_response, "storing data");
            break;
        case "refresh":
            Database.findAll(findCallback);
        // Hier das neue find command
        case "find":
            var matrikel = query["matrikel"];
            if (matrikel == null) {
                respond(_response, "Invalid matrikel sent");
                return;
            }
            var studentId = parseInt(matrikel);
            Database.find(studentId, findCallback);
            break;
        case "test":
            respond(_response, "Service is up");
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
    // findCallback is an inner function so that _response is in scope
    function findCallback(json) {
        respond(_response, json);
    }
}
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map