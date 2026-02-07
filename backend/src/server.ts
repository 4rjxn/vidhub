import express from "express";
import extractJson from "./yt.js";
import { addVideoToCollection, fetchVideoList } from "./db.js";
import { logger } from "./utils/logger.js";

const PORT = 3939;
const app = express();


app.get("/addURL", async (req, res) => {
    logger.debug(`Got add url ${req.query.url}`);
    const url: string = req.query.url as string;
    try {
        logger.debug(`Extracting json data.`);
        let jsonData = await extractJson(url);
        await addVideoToCollection(jsonData);
        res.sendStatus(200);
        logger.debug(`Done extraction and added to db`);
    } catch (err) {
        logger.error(`${err}`);
        res.send(500);
    }

});


app.get("/videos", async (req, res) => {
    logger.debug(`fetching video meta.`);
    const params: { page: number, limit: number } = {
        page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 1
    };
    try {
        const data = await fetchVideoList(params);
        res.send(data);
    } catch (err) {
        logger.debug(`${err}`);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => { logger.info(`Server started at port ${PORT}`) });
