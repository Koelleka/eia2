var UnoClient;
(function (UnoClient) {
    var Player = (function () {
        function Player() {
        }
        Player.prototype.isMe = function () {
            return this.id == Player.currentPlayer.id;
        };
        return Player;
    }());
    UnoClient.Player = Player;
})(UnoClient || (UnoClient = {}));
//# sourceMappingURL=Player.js.map