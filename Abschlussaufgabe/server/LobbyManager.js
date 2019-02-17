"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lobby_1 = require("./Lobby");
class LobbyManager {
    constructor() {
        this.lobbies = [];
    }
    openLobby(_name) {
        console.log("openLobby " + _name);
        let lobby = new Lobby_1.Lobby();
        lobby.id = Math.floor(Math.random() * 10000);
        lobby.name = _name;
        this.lobbies.push(lobby);
        console.log("lobby created " + lobby.id);
        return lobby;
    }
    closeLobby(_id) {
        console.log("closeLobby " + _id);
        var lobby = this.getLobby(_id);
        if (lobby != null) {
            // Eigentlich müsste man hier jetzt noch alle Spieler aus der Lobby kicken...
            this.lobbies = this.lobbies.filter(function (_obj) {
                return _obj.id != _id;
            });
        }
    }
    getLobby(_id) {
        for (var i = 0; i < this.lobbies.length; i++) {
            var lobby = this.lobbies[i];
            if (lobby.id == _id) {
                return lobby;
            }
        }
        return null;
    }
    getLobbies() {
        return this.lobbies;
    }
    // https://stackoverflow.com/a/36978360
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.LobbyManager = LobbyManager;
//# sourceMappingURL=LobbyManager.js.map