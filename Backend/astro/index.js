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
app.use(morgan("common")); // Logging middleware
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

//Render the home page and clear previous data:
 
app.get("/", (req, res) => {
  getCurrentDate();
  res.render("index.ejs", { 
    objects: null,
    searchTerm: null,
    totalResults: 0,
    currentDate: getCurrentDate(),
    error: null
  })
});

//Submit users Obect Name and search type to the Astronomy API and present the results to the user.
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
          const objectsArray = createObjectsArray(apiResponse);
          console.log("objectsArray:  " + JSON.stringify(objectsArray, null, 2));  
          res.render("index.ejs", { 
            objects: objectsArray, 
            searchTerm: capitalizeFirstLetter(req.body.term),
            totalResults: objectsArray.length,
            currentDate: getCurrentDate(),
            error: null
          }); // Render index.ejs with the data
              
    
          
        } catch (error) {
               console.error("Failed to make request:", error.message);1
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
            objects: null, 
            error: errorMessage,
            currentDate: getCurrentDate()
          });
        }
});

/*The function createObjectsArray takes the apiResponse, if it exists and has data, 
iterates over it and parses out the name and id.name and puts this in objectsArray to be sent to index.ejs and presented
to the user.
*/
function createObjectsArray(apiResponse) {
  
  const objectsArray = [];  // objectsArray stores data to be rendered in index.ejs, 
  // Also reinitialize objects array to null.
  if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
    apiResponse.data.forEach(element => {  //interate over each element in apiResponse.data and execute a callback function
      //once for each element.
      const obj = {
        name: element.name,
        Type: element.type?.name, // Using optional chaining in case id doesn't exist
        Sub_Type: element.subType.name,
        Catalog_Name: element.crossIdentification,
        Right_Ascension:  element.position.equatorial.rightAscension.string,
        Declination:  element.position.equatorial.declination.string,
        InConstellation: element.position.constellation.name,
        
      };
      objectsArray.push(obj); //push each obj(ect) found into the objectsArray as the next element
      
    });
  } else {
    console.log("No data found in API response to create objectsArray.");

  }
  
  return objectsArray;
} 
function getCurrentDate() { //get the current date to pass into the index.ejs file, partials footer.ejs.
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        console.log `${month}/${year}`;
        return `${month}/${year}`;  // Format: MM/YYYY
}
//capitalize 1st character
function capitalizeFirstLetter(variable) {
  if (!variable) {
    return "no SearchTerm"
  } else {
    return variable.charAt(0).toUpperCase() + variable.slice(1);
  }
}