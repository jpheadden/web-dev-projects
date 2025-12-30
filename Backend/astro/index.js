import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenvx from "@dotenvx/dotenvx";
import morgan from "morgan";


const API_URL = "https://astronomyapi.com/api/v2/search";
const API_Key = process.env.RAPIDAPI_KEY;
// 2. Create an express app and set the port number.
const app = express();
//const port = 3000;
// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined")); // Logging middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

dotenvx.config({ path: '.env' });
//console.log('Hello ${process.env.HELLO}');

// Environment Variables Check
console.log("🔐 Environment Variables Check:");
console.log("- ASTROAPI_Host:", process.env.ASTROAPI_Host ? "✓ Loaded" : "✗ Missing");
console.log("- ASTROAPI_Username:", process.env.ASTROAPI_Username ? "✓ Loaded" : "✗ Missing");
console.log("- ASTROAPI_Secret:", process.env.ASTROAPI_Secret ? "✓ Loaded" : "✗ Missing");

// Use PORT from environment variables, fallback to 3000
const PORT = process.env.PORT || 3000;
const host = process.env.ASTROAPI_Host;
const applicationID = process.env.ASTROAPI_Username;
const applicationSecret = process.env.ASTROAPI_Secret;
//const authString = Buffer.toString(`applicationId:applicationSecret`, "base64");
//console.log("AuthString: " + authString);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: "Enter the celestial body name: " })
});
app.post("/astro-submit", async (req, res) => { 
  const url = host + "/search";
  console.log("URL: ", url);
  console.log("Auth Details:");
  console.log("- Username/AppID:", applicationID ? "✓ Present" : "✗ Missing");
  console.log("- Secret:", applicationSecret ? "✓ Present" : "✗ Missing");
  console.log("- Host:", host);
  console.log("term:", req.body.term);
  console.log("match_type:", req.body.match_type);

  
      try {
          const response = await axios.get(url, {
           auth:  {
            username: applicationID.trim(),
            password: applicationSecret.trim()
           }, params: {
            term: req.body.term,
            match_type: req.body.match_type
           }
          }); // Make API request 
          
          const apiResponse = response.data;
          console.log("Authentication Success!");
          console.log("Response Status:", response.status);
          console.log("Response Headers:", response.headers);
          //console.log("Result(response.data):", response.data) // Log the entire response data
          console.log("API Response stringified:  " + JSON.stringify(apiResponse, null, 2));


          // Loop through apiResponse and write the name and type.name of each object to an array called objectsArray:
            const objectsArray = [];
            if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
          res.render("index.ejs", { 
            data: apiResponse, // Pass the API response to the EJS template as data to be passed to the EJS template:

            error: null // No error initially
          }); // Render index.ejs with the data
             
    
          
        } catch (error) {
               console.error("Failed to make request:", error.message);
               console.error("Error details:", {
                 status: error.response?.status,
                 statusText: error.response?.statusText,
                 headers: error.response?.headers,
                 data: error.response?.data
               });
               
              let errorMessage;
              if (error.response && error.response.status === 401) {
                errorMessage = "🚫 Authentication Failed: Invalid credentials or unauthorized access.";
                console.log("❌ AUTHENTICATION ISSUE - Check your API credentials!");
              } else if (error.response && error.response.status === 403) {
                errorMessage = "🚫 Access Forbidden: Authentication succeeded but you don't have permission.";
                console.log("❌ AUTHORIZATION ISSUE - Check your API permissions!");
              } else if (error.response && error.response.status === 402) {
                errorMessage = "💳 Payment Required: " + error.message;
              } else if (error.response && error.response.status === 422) {
                errorMessage = "📝 The server understands your request's format but can't process its instructions. Error:  " + error.message;
                console.log("✅ AUTHENTICATION LIKELY OK - This is a data validation issue, not auth!");
              } else {
              errorMessage = "No activities match your criteria Gringo. Error: " + error.message;
              }
          console.log(errorMessage);
          res.render("index.ejs", { 
            data: null, 
            error: errorMessage
          });
        }
});
 function createObjectsArray(apiResponse)   {
  const objectsArray = [];
  
    if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
      array.forEach(element => {
        
      });
    }
        