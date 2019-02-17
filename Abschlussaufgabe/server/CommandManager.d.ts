import { Command } from "./Command";
export interface CommandMap {
    [command: string]: Command;
}
export declare class CommandManager {
    private static _instance;
    commands: CommandMap;
    private constructor();
    addCommand(_command: Command): void;
    getCommand(_command: string): Command;
    static readonly Instance: CommandManager;
}
