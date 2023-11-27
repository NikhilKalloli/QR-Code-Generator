import express from "express";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.set("view engine","ejs");
app.set("views", (__dirname +"/views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname  + "/public"));




app.get("/",(req,res)=>{
  const defaultImg = "Default.png";  
  res.render("index.ejs",{savedImg:defaultImg});
})


app.post("/generate",(req,res)=>{
  // console.log(req.body.userURL);
  let URL = req.body.userURL;
  // console.log(URL);


  let imgType = req.body.selectedValue;

 // Deleting existing file.
  // fs.rm(`/public/qr_img.${imgType}`, { recursive:true }, (err) => {
  //   // if (err) throw err;
  //   console.log("File deleted successfully");
  // })


    let qr_svg = qr.image(URL,{ type: `${imgType}`, margin: 4 });

    let fileLocation =  `public/qr_img.${imgType}`;
    qr_svg.pipe(fs.createWriteStream(fileLocation));
    
        
    fs.writeFile('URL.txt', URL, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 

      // console.log(fileLocation);
      const savedImg = `qr_img.${imgType}`;
      
      
      // res.render("generate.ejs",{savedImg});
      res.render("index.ejs",{savedImg,URL});
  })

  


  app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
  })