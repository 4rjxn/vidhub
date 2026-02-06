import express from "express";
import extractJson from "./yt.js";

const PORT = 3939;
const app = express();


app.get("/addURL", async (req, res) => {
    const url: string = req.query.url as string;
    console.log(url);
    let jsonData = await extractJson(url);
    console.log(jsonData.title);

});

app.listen(PORT, () => "App started....");
