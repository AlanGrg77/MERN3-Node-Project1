require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database/index');
const Blog = require('./model/blogModel');
const { storage, multer } = require('./middleware/multerConfig');
const app = express();
const fs = require('fs');

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

app.get('/blog/:id',async (req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({
        message : 'api hit',
        data : blog 
    })
})

app.delete('/blog/:id', async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    const ImageName = blog.image;
    fs.unlink(`./storage/${ImageName}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('deleted successfully')
        }
    })
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        message : 'deleted successfully'
    })
})

app.patch('/blog/:id',upload.single('image'), async (req,res)=>{
    const {id} = req.params;
    const {title, subtitle, description } = req.body;
    const blog = Blog.findById(id)
    let ImageName = blog.image; //if no change in image
    if(req.file){
        ImageName = req.file.filename; // if there is change in image then take the filename from req.file
        const OldImageName = blog.image;
        fs.unlink(`./storage/${OldImageName}`,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('deleted successfully')
            }
        });                                             
    } 
    
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : ImageName
    })

    res.status(200).json({
        message: 'updated successfully'
    });
})

app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log("Hello node");
})