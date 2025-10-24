import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";  // body parser is the middleware function

import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public")); // Serve static files from the public folder
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.post("/submit", (req, res) => {  //note anonymous function
  console.log(req.body);
}
);
app.get("/", (req, res) => {  //get sends back a resource that the user wants
  console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
