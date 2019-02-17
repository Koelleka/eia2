"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerEvent_1 = require("./ServerEvent");
const PlayerManager_1 = require("./PlayerManager");
const LobbyManager_1 = require("./LobbyManager");
class Command {
    constructor() {
        console.log("new command");
    }
    execute(_game, _lobby, _player, _card, _name) {
        console.log("executing command " + this.command);
        return null;
    }
}
exports.Command = Command;
// Player Commands
class CreatePlayerCommand extends Command {
    constructor() {
        super();
        this.command = "createPlayer";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var player = PlayerManager_1.PlayerManager.Instance.createPlayer(_name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        if (player != null) {
            resultEvent.success = true;
            resultEvent.player = player;
        }
        return resultEvent;
    }
}
exports.CreatePlayerCommand = CreatePlayerCommand;
// Game Commands
class PlayCardCommand extends Command {
    constructor() {
        super();
        this.command = "playCard";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
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
        return event;
    }
}
exports.PlayCardCommand = PlayCardCommand;
class PickCardCommand extends Command {
    constructor() {
        super();
        this.command = "pickCard";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var card = _game.pickCard();
        var nextPlayer = _game.currentPlayer;
        var event = new ServerEvent_1.ServerEvent();
        event.type = this.command;
        event.card = card;
        event.game = _game;
        event.lobby = _lobby;
        event.player = nextPlayer;
        event.success = true;
        return event;
    }
}
exports.PickCardCommand = PickCardCommand;
// Lobby Commands
class CreateLobbyCommand extends Command {
    constructor() {
        super();
        this.command = "createLobby";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var lobby = LobbyManager_1.LobbyManager.Instance.openLobby(_name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        if (lobby != null) {
            resultEvent.success = true;
            resultEvent.lobby = lobby;
        }
        return resultEvent;
    }
}
exports.CreateLobbyCommand = CreateLobbyCommand;
class GetLobbiesCommand extends Command {
    constructor() {
        super();
        this.command = "getLobbies";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var lobbies = LobbyManager_1.LobbyManager.Instance.getLobbies();
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        resultEvent.lobbyList = lobbies;
        return resultEvent;
    }
}
exports.GetLobbiesCommand = GetLobbiesCommand;
class JoinLobbyCommand extends Command {
    constructor() {
        super();
        this.command = "joinLobby";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var success = _lobby.join(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = success;
        return resultEvent;
    }
}
exports.JoinLobbyCommand = JoinLobbyCommand;
class LeaveLobbyCommand extends Command {
    constructor() {
        super();
        this.command = "leaveLobby";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        _lobby.leave(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        return resultEvent;
    }
}
exports.LeaveLobbyCommand = LeaveLobbyCommand;
class GetLobbyPlayersCommand extends Command {
    constructor() {
        super();
        this.command = "getLobbyPlayers";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.playerList = _lobby.players;
        resultEvent.success = true;
        return resultEvent;
    }
}
exports.GetLobbyPlayersCommand = GetLobbyPlayersCommand;
class ReadyCommand extends Command {
    constructor() {
        super();
        this.command = "ready";
    }
    execute(_game, _lobby, _player, _card, _name) {
        super.execute(_game, _lobby, _player, _card, _name);
        _lobby.ready(_player.id);
        var resultEvent = new ServerEvent_1.ServerEvent();
        resultEvent.type = this.command;
        resultEvent.success = true;
        if (_lobby.allPlayersReady()) {
            resultEvent.type = "startGame";
            resultEvent.game = _lobby.startGame();
        }
        return resultEvent;
    }
}
exports.ReadyCommand = ReadyCommand;
//} 
//# sourceMappingURL=Command.js.map