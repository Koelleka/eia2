"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class CommandManager {
    constructor() {
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
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map