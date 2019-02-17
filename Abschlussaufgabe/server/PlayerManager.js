"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class PlayerManager {
    constructor() {
        this.id = Math.random() * 10000;
        this.players = [];
        console.log("create player manager " + this.id);
    }
    createPlayer(_name) {
        console.log("createPlayer " + _name);
        let player = new Player_1.Player();
        player.id = Math.floor(Math.random() * 10000);
        player.name = _name;
        this.players.push(player);
        console.log("player created " + player.id);
        return player;
    }
    getPlayer(_id) {
        console.log("getPlayer " + _id + " " + this.id);
        for (var i = 0; i < this.players.length; i++) {
            console.log("check player " + this.players[i].id);
            var player = this.players[i];
            if (player.id == _id) {
                return player;
            }
        }
        return null;
    }
    // https://stackoverflow.com/a/36978360
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.PlayerManager = PlayerManager;
//# sourceMappingURL=Playermanager.js.map