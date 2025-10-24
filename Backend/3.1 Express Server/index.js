import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hidee Hidee Hidee Ho");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);  //callback function  note:  backticks
});