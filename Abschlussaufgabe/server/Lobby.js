"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var PlayerManager_1 = require("./PlayerManager");
var LobbyManager_1 = require("./LobbyManager");
var Lobby = (function () {
    function Lobby() {
        this.players = [];
    }
    Lobby.prototype.join = function (_id) {
        var player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
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
        console.log("Players in lobby " + this.players.length);
        return true;
    };
    Lobby.prototype.leave = function (_id) {
        var player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
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
    };
    Lobby.prototype.ready = function (_id) {
        console.log("check ready for player id " + _id);
        var player = PlayerManager_1.PlayerManager.Instance.getPlayer(_id);
        if (player == null) {
            console.log("player not found " + _id);
            return;
        }
        console.log("Player " + player.name + " is ready");
        player.isReady = true;
    };
    Lobby.prototype.allPlayersReady = function () {
        var allPlayersReady = true;
        for (var i = 0; i < this.players.length; i++) {
            allPlayersReady = allPlayersReady && this.players[i].isReady;
        }
        console.log("All players ready? " + allPlayersReady);
        return allPlayersReady;
    };
    Lobby.prototype.startGame = function () {
        console.log("start game " + this.game);
        if (this.game == null) {
            this.game = new Game_1.Game();
            this.game.id = this.id;
            if (this.players.length < 4) {
                var computerPlayers = 4 - this.players.length;
                console.log("create computer players " + computerPlayers);
                for (var i = 0; i < computerPlayers; i++) {
                    var computerPlayer = PlayerManager_1.PlayerManager.Instance.createPlayer("Computer " + (i + 1));
                    computerPlayer.isComputer = true;
                    computerPlayer.isReady = true;
                    this.players.push(computerPlayer);
                }
            }
            this.game.initGame(this.players);
        }
        return this.game;
    };
    return Lobby;
}());
exports.Lobby = Lobby;
//# sourceMappingURL=Lobby.js.map