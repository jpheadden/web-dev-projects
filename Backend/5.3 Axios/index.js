import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs fi

app.get("/", async (req, res) => { 
  
      try {
          const response = await axios.get("https://bored-api.appbrewery.com/random"); // Make API request 
        
          const result = response.data;
         console.log("Result(response.data):", result); // Log the entire response data
          res.render("index.ejs", { 
            data: result, // Pass the result to the EJS template as data
            error: null // No error initially
          }); // Render index.ejs with the data
             
    
          
        } catch (error) {
               console.error("Failed to make request:", error.message);
              let errorMessage;
              if (error.response && error.response.status === 429) {
                errorMessage = "Rate limited - wait 15 minutes. Error: " + error.message;
              } else {
              errorMessage = "No activities match your criteria Gringo. Error: " + error.message;
              }
          
          res.render("index.ejs", { 
            data: null, 
            error: errorMessage
          });
        }
        
});
app.post("/", async (req, res) => { 
  try {
        const response = await axios.get("https://bored-api.appbrewery.com/filter", { // Make API request with query parameters
            params: {
              type: req.body.type,
              participants: req.body.participants
            }
        }); 
        
        const result = response.data;
        //console.log("Filtered Result(response.data):", result); // Log the entire response data
        
        console.log("Type selected:", req.body.type); // Log selected type
        console.log("Participants selected:", req.body.participants); // Log selected participants
        if (result && result.length  > 0) {
          // If there are multiple activities, pick one at random
          const randomIndex = Math.floor(Math.random() * result.length);
          const randomActivity = result[randomIndex];
          res.render("index.ejs", { 
            data: randomActivity, // Pass the random activity to the EJS template as data
            error: null // No error initially
          }); // Render index.ejs with the random activity
        
        } else {
             res.render("index.ejs", { 
            data: null,
            error: "No activities that match your criteria."
          });
        };

      } catch (error) {
            console.error("Failed to make request:", error.message);
            let errorMessage;
            if (error && error.response && error.response.status === 429) {
                errorMessage = "Rate limited - wait 15 minutes. Error: " + error.message;
              } else {
              errorMessage = "No activities match your criteria Gringo. Error: " + error.message;
              }
            res.render("index.ejs", { 
              data: null,
              error: errorMessage  // ✅ Just key: value
            });
      }
      
//
 
});



  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
