require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database/index');
const Blog = require('./model/blogModel');
const { storage, multer } = require('./middleware/multerConfig');
const app = express();

app.use(express.json())

connectToDatabase()

const upload = multer({storage : storage})

app.get('/',(req,res)=>{
    // res.send("Hello Earth");
    res.status(200).json(
        {
            message:'Hello World'
        }
    )
})

app.post('/blog',upload.single("image"), async (req,res)=>{
    const {title,subtitle,description} = req.body;
    const filename = req.file.filename;
    console.log(req.body)
    console.log(req.file)
    if(!title || !subtitle || !description){
        return res.status(400).json(
            {
                message : 'Please enter title, subtitle, description'
            }
        )
    }
    

    await Blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image : filename
    });
    res.status(200).json({
        message : 'Blog api hit'
    })
})

app.get('/blog',async (req,res)=>{
   const blogs = await Blog.find();
   res.status(200).json({
    message: 'data fetched successfully',
    data : blogs
   })
})

app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log("Hello node");
})