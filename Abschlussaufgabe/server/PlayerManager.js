"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var PlayerManager = (function () {
    function PlayerManager() {
        this.players = [];
    }
    PlayerManager.prototype.createPlayer = function (_name) {
        var player = new Player_1.Player();
        player.id = Math.floor(Math.random() * 10000);
        player.name = _name;
        this.players.push(player);
        console.log("player " + _name + " created " + player.id);
        return player;
    };
    PlayerManager.prototype.getPlayer = function (_id) {
        for (var i = 0; i < this.players.length; i++) {
            console.log("check player " + this.players[i].id);
            var player = this.players[i];
            if (player.id == _id) {
                return player;
            }
        }
        return null;
    };
    Object.defineProperty(PlayerManager, "Instance", {
        // https://stackoverflow.com/a/36978360
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return PlayerManager;
}());
exports.PlayerManager = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map