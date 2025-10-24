import { dirname } from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
//that parses out the body so you can use the individual fields. It is now part of express btw.
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan"; //morgan logs messages in the console

let typeoDay = "";
const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name
//console.log("Directory Name is:  " + __dirname);
const app = express();
const port = 3000;
app.use(morgan("common")); //common is the format of the log message
app.use(weekend);
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
console.log(__dirname + "/views/index.ejs");

// route handler:
app.get("/", (req, res) => {  
    
    res.render(__dirname + "/views/index.ejs",
    { name: typeoDay}
  );
});
function weekend(req, res, next) {
   const today = new Date();
   let dayoWeek = today.getDay() + 0; //0 is Sunday, 6 is Saturday;
   
    console.log("day = " + today);
    console.log("day of Week is: " + dayoWeek);  
    
    if (dayoWeek === 0 || dayoWeek === 6) {
      typeoDay = "weekend"
    } else {
      typeoDay = "weekday"  
    }
    //return typeoDay;
    next();
  }
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});