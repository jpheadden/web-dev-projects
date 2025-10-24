import express from "express";
import { dirname } from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name
console.log("Directory Name is:  " + __dirname);
//set variables ol' Gringo:

let bandName = "";
const app = express();
const port = 3000;
//app.use(express.static(__dirname + "/public")); // Serve static files from the public folder
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies  Mount the middleware body parser with express.use method



// route handlers:

app.get("/", (req, res) => {  //wait for a get with / and send back a resource that the user wants
 console.log(__dirname + "/public/index.html" + " line 20");
  res.sendFile(__dirname + "/public/index.html");
});
app.use(band); 

app.post("/submit", (req, res) => {  //note anonymous function
 console.log(req.body);
 res.send(`<h1> Your monniker is:<h1><h2> ${bandName} ✌️<h2>`)
});


function band(req, res, next) {
  
  console.log("Request body: ", req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.listen(port, () => {
 console.log(`Listening on port ${port}`);
});
