import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {   //request and response
  console.log(req.rawHeaders);
  res.send("<h1>Hidee Hidee Hidee Ho</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Man, I tell you what, this is really fun!</h1><p>My name is Pappy</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Crocatoa east of Java</h1><p>Phone: +4412345678</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
 // console.log(req.rawHeaders);
});
