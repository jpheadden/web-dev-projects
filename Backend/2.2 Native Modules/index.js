const fs = require('fs');
/*read file:

fs.readFile('message.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
}); 
*/
//or
fs.readFile('message.txt', "utf8",  (err, data) => {
  if (err) throw err;
  console.log(data);
});
/*Write file
fs.writeFile("message.txt", "HideHo", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
}); 
*/

