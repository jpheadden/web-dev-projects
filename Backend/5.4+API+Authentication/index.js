import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "elGuapo";
const yourPassword = "OhHandsomeOne";
const yourAPIKey = "5cf57e0e-42c9-4d01-bc1e-0b8fc48c571d";
const yourBearerToken = "84594573-37e4-4cd2-9682-f36cad4ce0ee";
app.set("view engine", "ejs");
 //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
app.get("/", async (req, res) => {
  noAuthHandler(req, res);
});

app.get("/noAuth", (req, res) => {
 noAuthHandler(req, res);
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
    const url = API_URL + "all?page=2";
    console.log("URL:", url);
    try {  
      const response = await axios.get(url, {
          auth: {
            username: yourUsername,
            password: yourPassword,
          },
        });
      const result = JSON.stringify(response.data);
      console.log("Result(response.data):", result); // Log the entire response data
      res.render("index.ejs", { 
        content: result, // Pass the result to the EJS template as content
        error: null // No error initially
      }); // Render index.ejs with content
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

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const url = API_URL + "filter?score=5&apiKey=" + yourAPIKey;
  console.log("URL:", url);
  try {
      const response = await axios.get(url);
      const result = JSON.stringify(response.data);
      console.log("Result(response.data):", result);
      res.render("index.ejs", { 
        content: result,
        error: null
      });
      } catch (error) {
               console.error("Failed to make request:", error.message);
              let errorMessage;
              if (error.response && error.response.status === 429) {
                errorMessage = "Rate limited - wait 15 minutes. Error: " + error.message;
              } else {
              errorMessage = "No activities match your criteria Gringo. Error: " + error.message;
              }
          
          res.render("index.ejs", { 
            content: null, 
            error: errorMessage
          });
      } 
  });


app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const URL = API_URL + "secrets/42";
  console.log("URL:", URL);
  try {
    const response = await axios.get(URL, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      }
    });
  
    const result = JSON.stringify(response.data);
    console.log("Result(response.data):", result);
   res.render("index.ejs", { 
        content: result,
        error: null
      });
    } catch (error) {
               console.error("Failed to make request:", error.message);
              let errorMessage;
              if (error.response && error.response.status === 429) {
                errorMessage = "Rate limited - wait 15 minutes. Error: " + error.message;
              } else {
              errorMessage = "No activities match your criteria Gringo. Error: " + error.message;
              }
          
          res.render("index.ejs", { 
            content: null, 
            error: errorMessage
          });
      }
  
});
async function noAuthHandler(req, res) {  // Function to handle no authentication API requests
  try {
          const response = await axios.get(API_URL + "random"); // Make API request,'await' expressions are only allowed within async functions and at the top levels of modules.
        
          const result = JSON.stringify(response.data); // Convert the response data to a JSON string
         console.log("Result(response.data):", result); // Log the entire response data
          res.render("index.ejs", { 
            content: result, // Pass the result to the EJS template as content
            error: null // No error initially
          }); // Render index.ejs with content
             
    
          
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
      }
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
