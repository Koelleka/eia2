"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const PlayerManager_1 = require("./PlayerManager");
const LobbyManager_1 = require("./LobbyManager");
class Lobby {
    constructor() {
        this.players = [];
    }
    join(_id) {
        let player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
        if (this.players.length >= 4) {
            return false;
        }
        if (player == null) {
            console.log("player not found " + _id);
            return false;
        }
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == _id)
                return false;
        }
        console.log("Player joined " + player.id);
        this.players.push(player);
        console.log("Players in lobby " + this.players);
        return true;
    }
    leave(_id) {
        let player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
        if (player == null) {
            console.log("player not found " + _id);
            return;
        }
        console.log("Player left " + player.id);
        this.players = this.players.filter(function (_obj) {
            return _obj.id != player.id;
        });
        console.log("Players in lobby " + this.players);
        if (this.players.length == 0) {
            LobbyManager_1.LobbyManager.Instance.closeLobby(this.id);
        }
    }
    ready(_id) {
        let player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
        if (player == null) {
            console.log("player not found " + _id);
            return;
        }
        player.isReady = true;
    }
    allPlayersReady() {
        let allPlayersReady = true;
        for (var i = 0; i < this.players.length; i++) {
            allPlayersReady = allPlayersReady && this.players[i].isReady;
        }
        return allPlayersReady;
    }
    startGame() {
        if (this.game == null) {
            this.game = new Game_1.Game();
            this.game.id = this.id;
            this.game.lobby = this;
            if (this.players.length < 4) {
                var computerPlayers = 4 - this.players.length;
                for (var i = 0; i < computerPlayers; i++) {
                    var computerPlayer = PlayerManager_1.PlayerManager.Instance.createPlayer("Computer " + (i + 1));
                    computerPlayer.isComputer = true;
                    this.players.push(computerPlayer);
                }
            }
            this.game.initGame(this.players);
        }
        return this.game;
    }
}
exports.Lobby = Lobby;
//# sourceMappingURL=Lobby.js.map