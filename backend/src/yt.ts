import { spawn } from 'child_process';


let extractJson = (url: string): Promise<any> => {
    return new Promise((res, rej) => {
        let data: string = "";
        const prcs = spawn("yt-dlp", ["-j", url]);
        prcs.stdout.on('data', (d) => {
            data += d.toString();
        });

        prcs.on("close", (c) => {
            if (c !== 0) {
                return rej();
            }
            try {
                res(JSON.parse(data));
            } catch (err) {
                rej(err);
            }
        });

        prcs.stderr.on("data", () => { });

    });
};


export default extractJson;




