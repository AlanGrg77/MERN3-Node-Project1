const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    // res.send("Hello Earth");
    res.json(
        {
            message:'Hello World'
        }
    )
})

app.listen(3000,()=>{
    console.log("Hello node");
})