//import module
import { Blog } from "../models/blog.model.js"

export class blogService {
    static createBlog(value: any) {
        throw new Error('Method not implemented.')
    }
    //create a blog
    async createBlog(data: any) {
        try {
            const newBlog = await Blog.create(data)
            return newBlog

        } catch (error) {
            console.log(error)
        }
    }

    //get all blogs
    async getBlogs() {
        try {
            const blogs = await Blog.find({})
            return blogs

        } catch (error) {
            console.log(error)
        }
    }

    //get a single blog
    async getBlog(id: string) {
      
        try {
            const blog = await Blog.findById({_id:id})
            if (!blog) {
                return 'blog not available'
            }
            return blog

        } catch (error) {
            console.log(error)
        }
    }

    //update a blog
    async updateBlog(id: string, data: any) {
        try {

                const blogz = await Blog.findByIdAndUpdate({_id:id}, data, {new: true})                
                if(!blogz){
                    return "blog not available"
                }
                return blogz          
        } catch (error) {
            console.log(error)
        }
    }

    //delete a toblogdo by using the find by id and delete 
    async deleteBlog(id: string) {
        try {
            const blog = await Blog.findByIdAndDelete(id)
            if (!blog) {
                return 'blog not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const blogServices = new blogService()