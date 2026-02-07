import express from "express";
import extractJson from "./yt.js";
import { addVideoToCollection, fetchVideoList } from "./db.js";

const PORT = 3939;
const app = express();


app.get("/addURL", async (req, res) => {
    const url: string = req.query.url as string;
    console.log(url);
    try {
        let jsonData = await extractJson(url);
        await addVideoToCollection(jsonData);
        res.sendStatus(200);
    } catch (err) {
        res.send(500);
    }

});


app.get("/videos", async (req, res) => {
    const params: { page: number, limit: number } = {
        page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 1
    };
    try {
        const data = await fetchVideoList(params);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => "App started....");
