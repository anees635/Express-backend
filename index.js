const express = require("express");
const axios = require("axios");
const  cors = require('cors');
const bodypraser = require('body-parser')
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodypraser.json());

// port listening
const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`)
});

// post request and response to backend ai model

app.post('/translate', async(req, res)=>{
    const { source_text, source_language, target_language } = req.body;
      

    try{
           const response = await axios.post("http://localhost:5000/translate",
            {source_text, source_language,target_language}
           );
           res.json(response.data);
    }
    catch{
           res.status(500).json({err: 'failed to translate the text' })      
    }
});