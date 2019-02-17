"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("./Command");
var CommandManager = (function () {
    function CommandManager() {
        this.commands = {};
        this.addCommand(new Command_1.CreatePlayerCommand());
        this.addCommand(new Command_1.PlayCardCommand());
        this.addCommand(new Command_1.PickCardCommand());
        this.addCommand(new Command_1.CreateLobbyCommand());
        this.addCommand(new Command_1.GetLobbiesCommand());
        this.addCommand(new Command_1.JoinLobbyCommand());
        this.addCommand(new Command_1.LeaveLobbyCommand());
        this.addCommand(new Command_1.GetLobbyPlayersCommand());
        this.addCommand(new Command_1.ReadyCommand());
        this.addCommand(new Command_1.GetGameStateCommand());
    }
    CommandManager.prototype.addCommand = function (_command) {
        this.commands[_command.command] = _command;
    };
    CommandManager.prototype.getCommand = function (_command) {
        return this.commands[_command];
    };
    Object.defineProperty(CommandManager, "Instance", {
        // https://stackoverflow.com/a/36978360
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return CommandManager;
}());
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map