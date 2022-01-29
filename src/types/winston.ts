export type WinstonLevels = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

export type options = {
    handleExceptions: boolean
    json: boolean
    maxsize?: number
    maxFiles?: number
    colorize: boolean
}

export type WinstonOptionsFile = {
    level: WinstonLevels
    filename: string
} & options;

export type WinstonOptionsConsole = {
    level: WinstonLevels
} & options;

export type WinstonOptions = {
    file: WinstonOptionsFile
    console:WinstonOptionsConsole
};
