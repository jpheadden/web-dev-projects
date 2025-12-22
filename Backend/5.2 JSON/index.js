import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(morgan("common")); //common is the format message for troubleshooting messages
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

  const recipes = JSON.parse(recipeJSON); // Converts JSON string to an array of objects
  let data = {}; // Declare data variable to hold the selected recipe
 // console.log("Recipes:", recipes); // Log the parsed recipes to verify


app.get("/", (req, res) => { // Handle GET requests to the root path
    res.render("index.ejs", { data: {} }); // Render the index.ejs file
});
app.post("/recipe", (req, res) => {
  
  //console.log("data:", data);
  // console.log("data.ingredients:", data.ingredients); 
  //console.log("Type of ingredients:", typeof data.ingredients);
  //console.log("Is array?", Array.isArray(data.ingredients));
    switch (req.body.choice) { // Switch based on the choice from the form submission
        case "chicken":
          console.log("Selecting Chicken Taco"); // Debug log
          data = recipes.find(recipe => recipe.name === "Chicken Taco"); // Find the chicken taco recipe
          break; // Don't forget to add break statements to prevent fall-through
        case "beef": 
          data = recipes.find(recipe => recipe.name === "Beef Taco");
          break;
        case "fish":
          data = recipes.find(recipe => recipe.name === "Fish Taco");
          break;
        default:
          break; 
         
    }
  console.log("Data:", data); // Log the selected recipe data to the console
  
  res.render("index.ejs", { data })
  });
 

  
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
