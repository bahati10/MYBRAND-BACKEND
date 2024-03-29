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

    async addComment(blogId: string, commentData: any, firstName: string) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error("Blog not found");
            }
            // Add the firstname to the comment data
            commentData.firstName = firstName;
            blog.comments.push(commentData);
            const updatedBlog = await blog.save();
            return updatedBlog;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async likeBlog(blogId: string, userId: string) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog not found');
            }
            if (blog.likes.includes(userId)) {
                throw new Error('You already liked this blog');
            }
            blog.likes.push(userId);
            const updatedBlog = await blog.save();
            return updatedBlog;
        } catch (error) {
            console.error('Error liking blog:', error);
            throw new Error('Failed to like blog');
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

    //delete a blog by using the find by id and delete 
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