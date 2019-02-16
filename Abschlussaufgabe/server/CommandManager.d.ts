declare namespace UnoServer {
    interface CommandMap {
        [command: string]: Command;
    }
    class CommandManager {
        private static _instance;
        commands: CommandMap;
        private constructor();
        addCommand(_command: Command): void;
        getCommand(_command: string): Command;
        static readonly Instance: CommandManager;
    }
}
