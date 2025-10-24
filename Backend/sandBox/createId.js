import path from "path";
import { dirname } from "path";  // to create the directory to send the file to.
import bodyParser from "body-parser";  // body parser is the middleware function
//that parses out the body so you can use the individual fields. It is now part of express btw.
import { fileURLToPath } from "url";
import express from "express";
import fs from "fs"; /*  File System, fs,  is a core built-in module that enables 
interaction with the file system on the computer running your Node.js application. */
import morgan from "morgan"; //morgan logs messages in the console
import { create } from "domain";
const __dirname = dirname(fileURLToPath(import.meta.url));  //gets directory name

console.log("The directory Name is:  " + __dirname);
const app = express();
const POSTS_FILE = path.join(__dirname, "posts.json"); //join all arguments together
console.log("The Json - storage - path is: " + POSTS_FILE);
const port = 3000;

/**
 * Function to create a unique post ID based on the current date and existing posts
 * The ID format is MMDDYYYYNNN where NNN is a sequential number for posts created on the same day
 */ 

function createPostId(posts) {
  // Generate a unique ID for a new post
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
    console.log("New post ID:", newId);
}
createPostId([]); // Call the function with an empty array to test
// Middleware to handle CORS and JSON body parsing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, () => {
  console.log(`Blog running at http://localhost: ${port}`);  
});