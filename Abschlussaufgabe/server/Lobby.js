var UnoServer;
(function (UnoServer) {
    class Lobby {
        join(_id) {
            let player = UnoServer.PlayerManager.Instance.getPlayer(_id);
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
            let player = UnoServer.PlayerManager.Instance.getPlayer(_id);
            if (player == null) {
                console.log("player not found " + _id);
                return;
            }
            console.log("Player left " + player.id);
            this.players = this.players.filter(function (_obj) {
                return _obj.id != player.id;
            });
            console.log("Players in lobby " + this.players);
        }
        ready(_id) {
            let player = UnoServer.PlayerManager.Instance.getPlayer(_id);
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
                this.game = new UnoServer.Game();
                this.game.id = this.id;
                this.game.lobby = this;
            }
            return this.game;
        }
    }
    UnoServer.Lobby = Lobby;
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=Lobby.js.map