import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import morgan from "morgan";
//import  ejs from "ejs";  // Embedded JavaScript templating

const app = express();
const port = 3000;   
app.use(morgan("dev")); // third party middleware function for logging


app.use(bodyParser.urlencoded({ extended: true })); // express "use" method
//body parser middleware function

app.get("/", (req, res) => {
  console.log(__dirname + "/views/index.js");
  res.render(__dirname + "/views/index.ejs", { fullName: null });

});

//app.use(lengthOfName);
app.post("/submit", lengthOfName, (req, res) => {
  console.log(`body`, req.body);
  res.render("index.ejs", { fullName: req.fullName });
 // res.send(`Hello ${req.body.fName} ${req.body.lName}, your name is ${req.nameLength} characters long`);
});

function lengthOfName(req, res, next) {
  req.fullName = req.body.fName + " " + req.body.lName;
  req.nameLength = req.fullName.length;
  console.log(req.fullName, req.nameLength);
  next();
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
