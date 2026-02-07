import fs from "fs";


type LogLevel = "info" | "debug" | "warn" | "error";

const fileLog = true;

function time() {
    return new Date().toLocaleTimeString();
}

function log(level: LogLevel, message: string) {
    //const time = new Date().toISOString();
    //const data = { time, level, messege, };
    //console.log(JSON.stringify(data));
    if (!fileLog) {
        console.log(`[${level.toUpperCase()}] ${time()} ${message}`);
    }
    fs.appendFileSync("app.log", `[${level.toUpperCase()}] ${time()} ${message}\n`);

}

export const logger = {
    debug: (message: string) => log("debug", message),
    info: (message: string) => log("info", message),
    warn: (message: string) => log("warn", message),
    error: (message: string) => log("error", message),
};

