import path, { dirname} from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
//that parses out the body so you can use the individual fields. It is now part of express btw.
import { fileURLToPath } from "url";
import express from "express";
import fs from "fs"; /*  File System, fs,  is a core built-in module that enables 
interaction with the file system on the computer running your Node.js application. */
import morgan from "morgan"; //morgan logs messages in the console
//declare constants:

const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name
const app = express();
const POSTS_FILE = path.join(__dirname, "posts.json"); //join all arguments together
const port = 3000;

console.log("The directory Name is:  " + __dirname);
console.log("The Json - storage - path is: " + POSTS_FILE);

/*Middleware -
  Middleware is a function that runs during the Express request→response cycle.
It receives (req, res, next) and can:
inspect/modify req and res,
perform side effects (logging, parsing, auth),
attach data (e.g., req.fullName or res.locals.someValue),
call next() to pass control or send a response to end the cycle.
Order matters:  middleware mounted earlier runs earlier
*/

app.use(morgan("common")); //common is the format message for troubleshooting messages
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("common")); // Logging middleware combined dev common short tiny
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory
app.set("view engine", "ejs"); //tells Express to use EJS to render templates.

// Write your code here:
//Helper functions:

function loadPosts() { //try and read posts if they exist
    //check if posts.json file exists and has posts, read file synchronously and put in data
    if (fs.existsSync(POSTS_FILE)) { //check if file exists
      const data = fs.readFileSync(POSTS_FILE, "utf8"); //read file synchronously and put in the variable 
      console.log("Data read from posts.json: ", data);
      // If the file exists but is empty, return an empty array
         //check if data has more than two characters (to account for [] empty array)
      if (data.length > 2) { 
        //parse data into the variable posts and write to console
        const posts = JSON.parse(data);
        return posts; //return the posts array
       
           } else {
              console.log("No Posts returned.");
              return []; //return an empty array if no posts
           }; 
    } else {
      console.log("posts.json does not exist. Returning empty array.");
      // If the file doesn't exist, create it with an empty array
      fs.writeFileSync(POSTS_FILE, "[]"); //write an empty array to the file
      console.log("posts.json created.");
      return [];  //always return an array
    
  }
}
function savePosts(posts) {
  // Save posts to the JSON file
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2)); 
  /* fs.writeFileSync is a synchronous method within Node.js's built-in File System (fs)
   module used for writing data to a file. 
   This method blocks the Node.js event loop until the file writing operation is completely 
   finished. 
   stringify converts a JavaScript object or array into a JSON-formatted string. 3rd argument is 
   # of spaces. v
   */
  console.log("Post saved: " + posts)
}


function createPostId(posts) {
  // Generate a unique ID for a new post mmddyyyynnn
  //create a date string for today in the format mmddyyyy 
  const now = new Date();
  const dateStr = `${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()).padStart(2, "0")}${now.getFullYear()}`;
    //write date string to console:
    console.log("Date string for new post ID:", dateStr);
    //find the highest existing post ID for today
    const maxId = posts.reduce((max, post) => {
      const postDateStr = post.id.slice(0, 8); // Extract date part from post ID
      const postIdNum = parseInt(post.id.slice(8), 10); // Extract numeric part from post ID
      if (postDateStr === dateStr) {
        return Math.max(max, postIdNum);
      }
      return max;
    }, 0);
    // Increment the highest ID number for today or start at 1 if none exist
    const newIdNum = maxId + 1;
    // Combine date string with new ID number, padded to 3 digits
    const newId = `${dateStr}${String(newIdNum).padStart(3, "0")}`;
    console.log("New post ID generated:", newId);
    return newId;
    // Example output: "09252023001" for the first post on September 25, 2023
    
}
 

//  Routes:  Step 1: Render the home page "/" index.ejs
//common http methods:  Get (resource from server), post (send data to the resouce), put (replace), patch (update), delete (remove)

 app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  const posts = loadPosts() // load posts newest first
  //checking if posts exist and is an array and has length.
   
      res.render("index.ejs", { posts }); //why braces here?  Because we are passing an object to the template 
    
});
app.get("/post/:id", (req, res) => {  // match route patterns that start with /post/ and id associated with the post
  const posts =loadPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("post", { post });
  } else {
    res.status(404).send("Post not found"); 
  }
});

app.get("/new", (req, res) => {  //retrieve a post and render it
  res.render("newPost");
  
});

 app.get("/about", (req, res) => { 
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// post (Create) method:
//1. read existing posts from JSon, 2. build a new post, 3. add new post and 4 redirect user to the 
//home page.
app.post("/new", (req, res) => {
 
  const posts = loadPosts(); //read existing posts
  const newPost = {
    id: createPostId(posts), //create a unique ID for the new post
    subject: req.body.subject,
    title: req.body.title,
    content: req.body.content,
    createdAt:  new Date()
  };
  console.log("newPost is " + newPost);
  console.log("New post is " + JSON.stringify(newPost, null, 2));
  posts.push(newPost); //add new post to posts array
  savePosts(posts); //save posts to the JSON file
  // Redirect to the home page after saving the post
  res.redirect("/");
});
// Delete (Delete) method:

app.post("/delete/:id", (req, res) => {
  const posts = loadPosts();
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx !== -1) {
    posts.splice(idx, 1);
    savePosts(posts);
    console.log(`Deleted post ${req.params.id}`);
    return res.redirect("/");
  }
  console.log(`Post not found: ${req.params.id}`);
  res.status(404).send("Post not found");
});
// Edit (Update) method:
// ...existing code...
app.get("/edit/:id", (req, res) => {
  const posts = loadPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("editPost", { post }); // Render the editPost.ejs template with the post data
  } else {
    res.status(404).send("Post not found");
  }
});
// Handle the form submission for editing a post: 
app.post('/edit/:id', (req, res) => {
  const posts = loadPosts(); 
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex !== -1) {
    posts[postIndex] = {
    ...posts[postIndex], // ← Copies ALL existing properties from the original post
    title: req.body.title,        // ← Overwrites title with new value
    content: req.body.content,    // ← Overwrites content with new value
    subject: req.body.subject,    // ← Overwrites subject with new value
    updatedAt: new Date().toISOString() // ← Adds new updatedAt field
    };

    savePosts(posts); // Save updated posts to file
  }
  res.redirect(`/post/${req.params.id}`); // Redirect to the updated post view
});

  
app.listen(port, () => {
  console.log(`Blog running at http://localhost: ${port}`);  
});
