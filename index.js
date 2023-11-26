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

app.use(express.static("public"));




app.get("/",(req,res)=>{
  res.render("index.ejs");
})


app.post("/generate",(req,res)=>{
  // console.log(req.body.userURL);
  let URL = req.body.userURL;


  let imgType = req.body.selectedValue;

    let qr_svg = qr.image(URL,{ type: `${imgType}` });
    qr_svg.pipe(fs.createWriteStream(`public/qr_img.${imgType}`));
    
        
    fs.writeFile('URL.txt', URL, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
      res.render("index.ejs");
  })

  


  app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
  })