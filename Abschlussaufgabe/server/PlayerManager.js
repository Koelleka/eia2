var UnoServer;
(function (UnoServer) {
    class PlayerManager {
        constructor() {
            this.players = [];
        }
        createPlayer(_name) {
            console.log("createPlayer " + _name);
            let player = new UnoServer.Player();
            player.id = Math.floor(Math.random() * 10000);
            player.name = _name;
            this.players.push(player);
            console.log("player created " + player.id);
            return player;
        }
        getPlayer(_id) {
            for (var i = 0; i < this.players.length; i++) {
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
    UnoServer.PlayerManager = PlayerManager;
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=PlayerManager.js.map