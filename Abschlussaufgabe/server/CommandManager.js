var UnoServer;
(function (UnoServer) {
    class CommandManager {
        constructor() {
            this.commands = {};
            this.addCommand(new UnoServer.CreatePlayerCommand());
            this.addCommand(new UnoServer.PlayCardCommand());
            this.addCommand(new UnoServer.PickCardCommand());
            this.addCommand(new UnoServer.CreateLobbyCommand());
            this.addCommand(new UnoServer.JoinLobbyCommand());
            this.addCommand(new UnoServer.LeaveLobbyCommand());
            this.addCommand(new UnoServer.ReadyCommand());
        }
        addCommand(_command) {
            this.commands[_command.command] = _command;
        }
        getCommand(_command) {
            return this.commands[_command];
        }
        // https://stackoverflow.com/a/36978360
        static get Instance() {
            return this._instance || (this._instance = new this());
        }
    }
    UnoServer.CommandManager = CommandManager;
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=CommandManager.js.map