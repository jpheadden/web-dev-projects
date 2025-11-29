import express from "express"; // ES6 module syntax
const app = express(); // create an Express application
const port = 3000; //

app.get("/", (req, res) => {
    res.send("Hidee Hidee Hidee Ho");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);  //callback function  note:  backticks
});