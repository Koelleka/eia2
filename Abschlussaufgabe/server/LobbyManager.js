var UnoServer;
(function (UnoServer) {
    class LobbyManager {
        constructor() {
            this.lobbies = [];
        }
        openLobby(_name) {
            console.log("openLobby " + _name);
            let lobby = new UnoServer.Lobby();
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
                // TODO kick players from lobby
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
    UnoServer.LobbyManager = LobbyManager;
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=LobbyManager.js.map