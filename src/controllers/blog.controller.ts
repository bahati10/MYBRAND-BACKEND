//import modules
import { Request, Response } from 'express'
import { Blog, BlogschemaValidate } from '../models/blog.model.js'
import { blogServices } from '../services/blogs.service.js'

class blogController {
    //add blog controller
    addblog = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            image: req.body.image,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
        }
        const {error, value} = BlogschemaValidate.validate(data)

        if(error){
            res.json({ message: error })

        }else{
            const blog = await blogServices.createBlog(value)
            res.status(201).json({ message: "Blog Added successfully: ", blog })          
        }
        
    }

    //get all blogs
    getBlogs = async (req: Request, res: Response) => {
        const blogs = await blogServices.getBlogs()
        res.json({ message: "Blogs retrieved successfully : ", blogs })
    }


    //get a single blog
    getABlog = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const blog = await blogServices.getBlog(id)
        res.json({ message: "Blog Retrieved successfully", blog })
    }

    //update blog
    updateBlog = async (req: Request, res: Response) => {
        const id = req.params.id
       const blog = await blogServices.updateBlog(id, req.body)  
        res.json({ message: "Blog update successfully", blog })
    }


    //delete a blog
    deleteBlog = async (req: Request, res: Response) => {
        const id = req.params.id
        await blogServices.deleteBlog(id)
        res.json({ message: 'Blog with deleted successuly' })
    }

}

//export class
export const BlogController = new blogController()