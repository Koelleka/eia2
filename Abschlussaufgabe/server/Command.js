var UnoServer;
(function (UnoServer) {
    class Command {
        execute(_game, _lobby, _player, _card, _name) {
            console.log("executing command " + this.command);
            return null;
        }
    }
    UnoServer.Command = Command;
    // Player Commands
    class CreatePlayerCommand extends Command {
        constructor() {
            super();
            this.command = "createPlayer";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            var player = UnoServer.PlayerManager.Instance.createPlayer(_name);
            var resultEvent = new UnoServer.ServerEvent();
            resultEvent.type = this.command;
            if (player != null) {
                resultEvent.success = true;
                resultEvent.player = player;
            }
            return resultEvent;
        }
    }
    UnoServer.CreatePlayerCommand = CreatePlayerCommand;
    // Game Commands
    class PlayCardCommand extends Command {
        constructor() {
            super();
            this.command = "playCard";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            // TODO Hier muss die ganze SPiele logik rein
            return null;
        }
    }
    UnoServer.PlayCardCommand = PlayCardCommand;
    class PickCardCommand extends Command {
        constructor() {
            super();
            this.command = "pickCard";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            // TODO karte ziehen und als Event zurückschicken
            return null;
        }
    }
    UnoServer.PickCardCommand = PickCardCommand;
    // Lobby Commands
    class CreateLobbyCommand extends Command {
        constructor() {
            super();
            this.command = "createLobby";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            var lobby = UnoServer.LobbyManager.Instance.openLobby(_name);
            var resultEvent = new UnoServer.ServerEvent();
            resultEvent.type = this.command;
            if (lobby != null) {
                resultEvent.success = true;
                resultEvent.lobby = lobby;
            }
            return resultEvent;
        }
    }
    UnoServer.CreateLobbyCommand = CreateLobbyCommand;
    class JoinLobbyCommand extends Command {
        constructor() {
            super();
            this.command = "joinLobby";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            var success = _lobby.join(_player.id);
            var resultEvent = new UnoServer.ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = success;
            return resultEvent;
        }
    }
    UnoServer.JoinLobbyCommand = JoinLobbyCommand;
    class LeaveLobbyCommand extends Command {
        constructor() {
            super();
            this.command = "leaveLobby";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            _lobby.leave(_player.id);
            var resultEvent = new UnoServer.ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = true;
            return resultEvent;
        }
    }
    UnoServer.LeaveLobbyCommand = LeaveLobbyCommand;
    class ReadyCommand extends Command {
        constructor() {
            super();
            this.command = "ready";
        }
        execute(_game, _lobby, _player, _card, _name) {
            super.execute(_game, _lobby, _player, _card, _name);
            _lobby.ready(_player.id);
            var resultEvent = new UnoServer.ServerEvent();
            resultEvent.type = this.command;
            resultEvent.success = true;
            if (_lobby.allPlayersReady()) {
                resultEvent.type = "startGame";
                resultEvent.game = _lobby.startGame();
            }
            return resultEvent;
        }
    }
    UnoServer.ReadyCommand = ReadyCommand;
})(UnoServer || (UnoServer = {}));
//# sourceMappingURL=Command.js.map