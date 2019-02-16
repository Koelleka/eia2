
namespace UnoServer {
    //https://stackoverflow.com/a/13631733
    export interface CommandMap {
        [command: string]: Command;
    }

    export class CommandManager {
        private static _instance: CommandManager;
        public commands: CommandMap;

        private constructor() {
            this.commands = {};

            this.addCommand( new CreatePlayerCommand() );
            this.addCommand( new PlayCardCommand() );
            this.addCommand( new PickCardCommand() );
            this.addCommand( new CreateLobbyCommand() );
            this.addCommand( new JoinLobbyCommand() );
            this.addCommand( new LeaveLobbyCommand() );
            this.addCommand( new ReadyCommand() );
        }

        public addCommand( _command: Command ): void {
            this.commands[_command.command] = _command;
        }

        public getCommand( _command: string ): Command {
            return this.commands[_command];
        }

        // https://stackoverflow.com/a/36978360
        public static get Instance(): CommandManager {
            return this._instance || ( this._instance = new this() );
        }
    }
}