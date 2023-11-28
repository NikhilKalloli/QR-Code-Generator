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
app.use(express.static(__dirname  + "/public/Styles"));
app.use(express.static(__dirname  + "/public/Assets"));




app.get("/",(req,res)=>{
  const defaultImg = "Default.png";
  const defaultURL = "Enter your URL above" ;
  res.render("index.ejs",{savedImg:defaultImg, URL:defaultURL});
})


app.post("/generate",(req,res)=>{
    let URL = req.body.userURL;
    let imgType = req.body.selectedValue;

    let qr_svg = qr.image(URL,{ type: `${imgType}`, margin: 4 });

    let fileLocation =  `public/qr_img.${imgType}`;
    qr_svg.pipe(fs.createWriteStream(fileLocation));
    
    const savedImg = `qr_img.${imgType}`;
  
    res.render("index.ejs",{savedImg,URL});

  })


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
  })