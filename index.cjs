// api 
const express = require("express");
const axios = require("axios");
const  cors = require('cors');
const bodypraser = require('body-parser')
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodypraser.json());
app.use(express.urlencoded({ extended: false }));
// port listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`)
});

// post request and response to backend ai model

app.post('/translate', async(req, res)=>{
    const text = req.body.text;
    const targetLanguage = req.body.targetLanguage;
    
    
    try{
        console.log("in try");
        // send request to python backend to interact with ai model
           const response = await axios.post("https://ai-backend-eight.vercel.app/translate",
            {text,targetLanguage}
           );
           res.json(response.data);
    }
    catch{
           console.log(text);  
           console.log(targetLanguage);  
           res.status(500).json({err: 'failed to translate the text IN API' })      
    }
});