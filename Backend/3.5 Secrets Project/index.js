//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import { dirname } from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
//that parses out the body so you can use the individual fields. It is now part of express btw.
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";


const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name
//console.log("Directory Name is:  " + __dirname);
let passwd = "";
const app = express();
const port = 3000;
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get("/", (req, res) => {  //wait for a get with / and send back a resource that the user wants
 console.log(__dirname + "/public/index.html" + " line 15");
  res.sendFile(__dirname + "/public/index.html");
});
//check if pw is Crocatoa, if it is then send file secret.html
app.post("/check", pw_check, (req, res) => {
 // app.use(pw_check);
  res.sendFile(__dirname + "/public/secret.html");
});



function pw_check(req, res, next) {
  console.log("Request body: ", req.body);
  passwd = req.body["password"];
  if (passwd === "Crocatoa") {
    next();
    console.log("Correct Password");
  } else {
    console.log("Password incorrect");
    //res.sendFile(__dirname + "/public/index.html"); or a snazzier way, send them back 
    //to the home page:
    res.redirect("/");
  }
}// oh I'm so proud of you, ol' Gringo!
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});