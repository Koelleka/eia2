"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lobby_1 = require("./Lobby");
var LobbyManager = (function () {
    function LobbyManager() {
        this.lobbies = [];
    }
    LobbyManager.prototype.openLobby = function (_name, _player) {
        console.log("openLobby " + _name);
        var lobby = new Lobby_1.Lobby();
        lobby.id = Math.floor(Math.random() * 10000);
        lobby.name = _name;
        this.lobbies.push(lobby);
        console.log("lobby created " + lobby.id);
        lobby.join(_player.id);
        return lobby;
    };
    LobbyManager.prototype.closeLobby = function (_id) {
        console.log("closeLobby " + _id);
        var lobby = this.getLobby(_id);
        if (lobby != null) {
            // Eigentlich müsste man hier jetzt noch alle Spieler aus der Lobby kicken...
            this.lobbies = this.lobbies.filter(function (_obj) {
                return _obj.id != _id;
            });
        }
    };
    LobbyManager.prototype.getLobby = function (_id) {
        for (var i = 0; i < this.lobbies.length; i++) {
            var lobby = this.lobbies[i];
            if (lobby.id == _id) {
                return lobby;
            }
        }
        return null;
    };
    LobbyManager.prototype.getLobbies = function () {
        return this.lobbies;
    };
    Object.defineProperty(LobbyManager, "Instance", {
        // https://stackoverflow.com/a/36978360
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return LobbyManager;
}());
exports.LobbyManager = LobbyManager;
//# sourceMappingURL=LobbyManager.js.map