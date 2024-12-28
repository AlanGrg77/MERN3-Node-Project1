require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database/index');
const app = express();

connectToDatabase()


app.get('/',(req,res)=>{
    // res.send("Hello Earth");
    res.status(200).json(
        {
            message:'Hello World'
        }
    )
})

app.listen(process.env.PORT,()=>{
    console.log("Hello node");
})