"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ServerEvent_1 = require("./ServerEvent");
var PlayerManager_1 = require("./PlayerManager");
var LobbyManager_1 = require("./LobbyManager");
var Command = (function () {
    function Command() {
        console.log("new command");
    }
    Command.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        console.log("executing command " + this.command);
        return null;
    };
    return Command;
}());
exports.Command = Command;
// Player Commands
var CreatePlayerCommand = (function (_super) {
    __extends(CreatePlayerCommand, _super);
    function CreatePlayerCommand() {
        var _this = _super.call(this) || this;
        _this.command = "createPlayer";
        return _this;
    }
    CreatePlayerCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var player = PlayerManager_1.PlayerManager.Instance.createPlayer(_name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        if (player != null) {
            resultEvent.success = true;
            resultEvent.player = player;
        }
        return resultEvent;
    };
    return CreatePlayerCommand;
}(Command));
exports.CreatePlayerCommand = CreatePlayerCommand;
// Game Commands
var PlayCardCommand = (function (_super) {
    __extends(PlayCardCommand, _super);
    function PlayCardCommand() {
        var _this = _super.call(this) || this;
        _this.command = "playCard";
        return _this;
    }
    PlayCardCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var event = new ServerEvent_1.ServerEvent();
        event.type = this.command;
        event.card = _card;
        event.game = _game;
        event.lobby = _lobby;
        if (!_game.canPlayCard(_card)) {
            event.success = false;
        }
        else {
            event.success = true;
            _game.playCard(_card);
        }
        event.player = _game.currentPlayer;
        event.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();
        return event;
    };
    return PlayCardCommand;
}(Command));
exports.PlayCardCommand = PlayCardCommand;
var PickCardCommand = (function (_super) {
    __extends(PickCardCommand, _super);
    function PickCardCommand() {
        var _this = _super.call(this) || this;
        _this.command = "pickCard";
        return _this;
    }
    PickCardCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var card = _game.pickCard();
        var nextPlayer = _game.currentPlayer;
        var event = new ServerEvent_1.ServerEvent();
        event.type = this.command;
        event.card = card;
        event.game = _game;
        event.lobby = _lobby;
        event.player = nextPlayer;
        event.success = true;
        event.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();
        return event;
    };
    return PickCardCommand;
}(Command));
exports.PickCardCommand = PickCardCommand;
// Lobby Commands
var CreateLobbyCommand = (function (_super) {
    __extends(CreateLobbyCommand, _super);
    function CreateLobbyCommand() {
        var _this = _super.call(this) || this;
        _this.command = "createLobby";
        return _this;
    }
    CreateLobbyCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var lobby = LobbyManager_1.LobbyManager.Instance.openLobby(_name, _player);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        if (lobby != null) {
            resultEvent.success = true;
            resultEvent.lobby = lobby;
        }
        return resultEvent;
    };
    return CreateLobbyCommand;
}(Command));
exports.CreateLobbyCommand = CreateLobbyCommand;
var GetLobbiesCommand = (function (_super) {
    __extends(GetLobbiesCommand, _super);
    function GetLobbiesCommand() {
        var _this = _super.call(this) || this;
        _this.command = "getLobbies";
        return _this;
    }
    GetLobbiesCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var lobbies = LobbyManager_1.LobbyManager.Instance.getLobbies();
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        resultEvent.lobbyList = lobbies;
        return resultEvent;
    };
    return GetLobbiesCommand;
}(Command));
exports.GetLobbiesCommand = GetLobbiesCommand;
var JoinLobbyCommand = (function (_super) {
    __extends(JoinLobbyCommand, _super);
    function JoinLobbyCommand() {
        var _this = _super.call(this) || this;
        _this.command = "joinLobby";
        return _this;
    }
    JoinLobbyCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var success = _lobby.join(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = success;
        resultEvent.lobby = _lobby;
        return resultEvent;
    };
    return JoinLobbyCommand;
}(Command));
exports.JoinLobbyCommand = JoinLobbyCommand;
var LeaveLobbyCommand = (function (_super) {
    __extends(LeaveLobbyCommand, _super);
    function LeaveLobbyCommand() {
        var _this = _super.call(this) || this;
        _this.command = "leaveLobby";
        return _this;
    }
    LeaveLobbyCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        _lobby.leave(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        return resultEvent;
    };
    return LeaveLobbyCommand;
}(Command));
exports.LeaveLobbyCommand = LeaveLobbyCommand;
var GetLobbyPlayersCommand = (function (_super) {
    __extends(GetLobbyPlayersCommand, _super);
    function GetLobbyPlayersCommand() {
        var _this = _super.call(this) || this;
        _this.command = "getLobbyPlayers";
        return _this;
    }
    GetLobbyPlayersCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.playerList = _lobby.players;
        resultEvent.success = true;
        return resultEvent;
    };
    return GetLobbyPlayersCommand;
}(Command));
exports.GetLobbyPlayersCommand = GetLobbyPlayersCommand;
var ReadyCommand = (function (_super) {
    __extends(ReadyCommand, _super);
    function ReadyCommand() {
        var _this = _super.call(this) || this;
        _this.command = "ready";
        return _this;
    }
    ReadyCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        _lobby.ready(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        if (_lobby.allPlayersReady()) {
            resultEvent.type = "startGame";
            resultEvent.game = _lobby.startGame();
            resultEvent.game.checkIfCurrentPlayerIsComputerAndPlayIfTrue();
        }
        return resultEvent;
    };
    return ReadyCommand;
}(Command));
exports.ReadyCommand = ReadyCommand;
var GetGameStateCommand = (function (_super) {
    __extends(GetGameStateCommand, _super);
    function GetGameStateCommand() {
        var _this = _super.call(this) || this;
        _this.command = "getGameState";
        return _this;
    }
    GetGameStateCommand.prototype.execute = function (_game, _lobby, _player, _card, _name) {
        _super.prototype.execute.call(this, _game, _lobby, _player, _card, _name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        resultEvent.game = _game;
        if (resultEvent.game == null && _lobby != null) {
            resultEvent.game = _lobby.game;
            resultEvent.game.checkIfPlayerWonGame();
        }
        return resultEvent;
    };
    return GetGameStateCommand;
}(Command));
exports.GetGameStateCommand = GetGameStateCommand;
//# sourceMappingURL=Command.js.map