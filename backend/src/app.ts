import { spawn } from 'child_process';
const url = "https://youtu.be/l5ggH-YhuAw?si=c6y3lnc2gTQK3jBy"
let data: string = "";
let jsonData: any;

//const prcs = spawn("yt-dlp", ["-j", url]);
//
//prcs.stdout.on('data', (d) => {
//    data += d.toString();
//});
//
//prcs.on("close", () => {
//    jsonData = JSON.parse(data);
//    console.log(jsonData.title);
//
//})

const gurl = spawn("yt-dlp", ["--get-url", url]);

gurl.stdout.on('data', (d) => {
    data += d.toString();
});

gurl.on("close", () => {
    console.log(data);
})

