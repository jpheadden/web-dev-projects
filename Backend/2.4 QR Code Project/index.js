/* 
1. Use the inquirer npm package to get user input.

*/

//const url = await InputPrompt({ message: 'What url would you like to go to el Guapo?'}
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { error } from "console";

inquirer  
    .prompt([ //prompt the user for input
        {
            type: 'input',
            name: 'url',
            message: "What url would you like to go to el Guapo?"
        },
    ])
    .then((answers) => { //answers is an object that contains the user input
        console.log(answers);
        //2. Use the qr-image npm package to turn the user entered URL into a QR code image.
        const url = answers.url; //url is a variable with the url entered in by the user
        const qrCode = qr.image(url);  
        qrCode.pipe(fs.createWriteStream('qrCode.png'));
        console.log('The QR code has been saved to a file named "qrCode.png" oGr81');
        
        //3.  save the url in a file called qrCode.txt.
      
        fs.writeFile("url.txt", url, (err) => {
            if (err) throw err;
           console.log('The url has been saved to url.txt oGr81');
    });
});
    