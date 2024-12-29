require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database/index');
const Blog = require('./model/blogModel');
const app = express();

app.use(express.json())

connectToDatabase()


app.get('/',(req,res)=>{
    // res.send("Hello Earth");
    res.status(200).json(
        {
            message:'Hello World'
        }
    )
})

app.post('/blog', async (req,res)=>{
    const {title,subtitle,description,image} = req.body;
    if(!title || !subtitle || !description || !image){
        return res.status(400).json(
            {
                message : 'Please enter title, subtitle, description and image.'
            }
        )
    }

    await Blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image : image
    });
    res.status(200).json({
        message : 'Blog api hit'
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Hello node");
})