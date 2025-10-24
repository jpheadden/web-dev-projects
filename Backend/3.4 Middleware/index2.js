import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hidey Hidey Hidey Ho");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
