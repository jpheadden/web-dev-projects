import express from "express";
import bodyParser from "body-parser";
import fs from "fs"

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));
//Read jokes from jokes.json file:
let jokes = JSON.parse(fs.readFileSync('jokes.json', 'utf8')) //Jokes saved in json file

//function to save jokes to the jokes.json file:
function saveJokes() {
  fs.writeFileSync('jokes.json', JSON.stringify(jokes, null, 2));
}

//function to reindex jokes array to maintain consecutive IDs:
function reindexJokes() {
  jokes.forEach((joke, index) => {
    joke.id = index + 1; // Reindex starting from 1
  });
}
//Route handlers:
//1. GET a random joke
  app.get ("/random", (req, res) => {  //route followed by callback (what should happen when this request is received)
    const randomIndex = Math.floor(Math.random() * jokes.length);
    res.json(jokes[randomIndex]);  //respond to client with joke in JSon format (from JS object) based on random Index 
  });
//2. GET a specific joke
  app.get("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id); // Convert the id entered by the user from string to integer
    const foundJoke = jokes.find((joke) => joke.id === id); // find the joke in the array jokes that corresponds to the id integer
    res.json(foundJoke);
   
  });
//3. GET all jokes by filtering on the joke type
  app.get("/filter", (req, res) => {
    const type = req.query.type; // Access the 'type' query parameter from the request
    
    if (!type) {
      return res.status(400).json({ error: "jokeType parameter is required" });
    }
    
    const filteredJokes = jokes.filter((joke) => joke.jokeType.toLowerCase() === type.toLowerCase()); // Filter jokes based on the provided type (case-insensitive)
    res.json(filteredJokes); // Respond with the filtered jokes in JSON format
  });
//4. POST a new joke
  app.post("/jokes", (req, res) => {
        try {
          const { text, type } = req.body
          /* This is equivalent to:
          const text = req.body.text;
          const type = req.body.type;
          */
          if (!text || !type) {
            return res.status(400).json({ error: "Both text and type are required" });
          } else {
              const newJoke = {
                id:jokes.length + 1, //assign a new joke id to the new joke
                jokeText: req.body.text,
                jokeType: req.body.type,
              };
              jokes.push(newJoke);  //add new joke to the array jokes
              saveJokes(); //Save Jokes to Jokes.json
              console.log(jokes.slice(-1));  //write to the log the joke just added
              //slice() method extracts a portion of an array or string w/o modifying the original source
              //-1 indicates the last element in the array
              res.status(201).json(newJoke); //respond with the new joke and status code 201 (created)
          } 
        } catch (error) {
          console.error("Error creating new joke: ", error);
          res.status(500).json({ error: "Internal server error" });
        }
        });
      
//5. PUT a joke (i.e. replace a joke):
  app.put("/jokes/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id); //turn id into an integer
      console.log ("id is: " + id);
      const index = jokes.findIndex((joke) => joke.id === id); //find index of the  joke in jokes associated with the id the client entered
      console.log("Joke index:  " + index);
      if (isNaN(id)) { //returns true or falsy whether a value is "Not-a-Number" (NaN)
        return res.status(400).json({error: "Invalid id.  It is not a number"});
      } else if (index === -1) { return res.status(404).json({error: "Joke id: " + id + " not found."}) //check
      //to see if the index  is within the range of indexes in the jokes array
      } else {
          const replacementJoke = {
          id: id,
          jokeText: req.body.text,
          jokeType:  req.body.type,
        };
        
        jokes[index] = replacementJoke;  //replace the said joke with replacementJoke in memory
        saveJokes(); //write jokes to jokes.json file:
        res.json(replacementJoke);  //respond to client with the new joke to the user.
        
        
      }
    } catch (error) {
      console.error("Error replacing your joke: ", error);
      res.status(500).json({error: "Couldn't replace your joke. Sorry!"});
    }
  });
//6. PATCH a joke - edit a joke
  app.patch("/jokes/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id); //turn id into an integer
      const existingJoke = jokes.find((joke) => joke.id === id)  //loop through all jokes in jokes array and find the joke that matches the id entered.
      console.log ("id is: " + id);
      const index = jokes.findIndex((joke) => joke.id === id); //find index of the  joke in jokes associated with the id the client entered
      console.log("Joke index:  " + index);
      if (isNaN(id)) { //returns true or falsy whether a value is "Not-a-Number" (NaN)
        return res.status(400).json({error: "Invalid ID it is not a number"});
      } else if (index === -1) { return res.status(404).json({error: "Joke id: " + id + " not found."}) //check
      //to see if the index  is within the range of indexes in the jokes array
      } else {
          const replacementJoke = {
          id: id,
          /*if there is req.body.text, the client is updating the text.  If it is null, the text wasn't updated
          by the user.  Same with the type.  In these cases use the existing joke verbiage:  It's a shortcut to using
          if statements.
          
          */
          jokeText: req.body.text || existingJoke.jokeText,
          jokeType:  req.body.type || existingJoke.jokeType
        };
        
        jokes[index] = replacementJoke;  //replace the said joke with replacementJoke in memory
        saveJokes(); //write jokes to jokes.json file:
        res.json(replacementJoke);  //respond to client with the new joke to the user.
        
        
      }
    } catch (error) {
    console.error("Error replacing your joke: ", error);
    res.status(500).json({error: "Couldn't update your joke. Sorry!"});  
    }
  });
//7. DELETE Specific joke
  app.delete("/jokes/:id", (req, res) => {
    try {
      const userKey = req.query.key;
      //console.log("Key: " + userKey);
      const id = parseInt(req.params.id); //turn id into an integer
      
     
      const existingJoke = jokes.find((joke) => joke.id === id)  //loop through all jokes in jokes array and find the joke that matches the id entered.
      console.log ("id is: " + id);
      console.log ("Joke to delete: " + JSON.stringify(existingJoke));
      const index = jokes.findIndex((joke) => joke.id === id); //find index of the  joke in jokes associated with the id the client entered
      console.log("Joke index:  " + index);
     
      // checks for validation:
      if (isNaN(id)) { //returns true or falsy whether a value is "Not-a-Number" (NaN)
        return res.status(400).json({error: "Invalid ID it is not a number"});
      } else if (index === -1) { return res.status(404).json({error: "Joke id: " + id + " not found."}) //check
      //to see if the index  is within the range of indexes in the jokes array
      } else {
          if (userKey === masterKey) {
            jokes.splice(index, 1) //delete said joke
            reindexJokes(); //reindex all jokes to maintain consecutive IDs
            saveJokes(); //write jokes to jokes.json file:
            console.log("Joke deleted: " + JSON.stringify(existingJoke))
            res.json("OK, You're the boss. Joke with id: " + id + " has been deleted. All jokes reindexed.");  //respond to client with confirmation
          } else {
            res
            .status(404)
            .json({ error: "not authorized muchacho" })
          }
      }
    } catch (error) {
      console.error("Error replacing your joke: ", error);
    res.status(500).json({error: "Couldn't delete your joke. Sorry!"});  
    }
  });
//8. DELETE All jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes = [];  //delete all jokes
    res
     .status(200)
     .json({ confirm: "All jokes have been deleted"})
  }  else {
    res.status(404).json({ error: "What are you insane ol' Gringo?"})
  }

}); 

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});


