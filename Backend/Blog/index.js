import { dirname } from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
//that parses out the body so you can use the individual fields. It is now part of express btw.
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan"; //morgan logs messages in the console
const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name
console.log("The directory Name is:  " + __dirname);
const app = express();
const port = 3000;

// tell Express to use EJS templates
app.set("view engine", "ejs");
app.use(morgan("common")); //common is the format message for troubleshooting messages
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
console.log(__dirname);
app.use(morgan("combined")); // Logging middleware 
app.use(express.static("public")); // Serve static files from the "public" directory
/* Write your code here:
Step 1: Render the home page "/" index.ejs */
app.get("/", (req, res) => {
  res.render("index.ejs");
});
/*Step 2: Make sure that static files are linked to and the CSS shows up.

Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
  */
 app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
/*Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);  
});
