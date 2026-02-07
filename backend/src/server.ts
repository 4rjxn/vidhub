import express from "express";
import extractJson from "./yt.js";
import run from "./db.js";

const PORT = 3939;
const app = express();

run().catch(console.dir);

app.get("/addURL", async (req, res) => {
    const url: string = req.query.url as string;
    console.log(url);
    try {
        let jsonData = await extractJson(url);
    } catch (err) {
        res.send(500);
    }

});

app.listen(PORT, () => "App started....");
