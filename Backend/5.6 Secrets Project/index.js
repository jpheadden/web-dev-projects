// HINTS:
// 1. Import express and axios
import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";


const API_URL = "https://secrets-api.appbrewery.com";
// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  console.log("Got to the / home route");
 try {
    const result = await axios.get(API_URL + "/random"); 
    console.log("Full API Response:", JSON.stringify(result.data, null, 2));
    console.log("Secret: " + result.data.secret);
    console.log("User: " + result.data.username);
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username
    });
    
    } catch (error) {
      console.log("error:  " + JSON.stringify(error.response.data))
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  } 
});
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.


// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
