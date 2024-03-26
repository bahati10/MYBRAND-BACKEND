//importing modules
import  {Schema, model,} from 'mongoose'
import Joi, { array } from 'joi'

export const BlogschemaValidate = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    author: Joi.string(),
    content: Joi.string().required(),
})

//creating an interface 
interface IBlogs {
    image: string,
    title: string,
    subtitle: string,
    author: string,
    content: string,
    likes: string[];
    comments: {
        user: string;
        content: string;
    }[];
}

//Blogschema
const blogSchema = new Schema<IBlogs>({
    image: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [
            {
                user: String,
                content: String,
            },
        ],
        default: [],
    },
})

//creating a model
 export const Blog = model<IBlogs>('Blog', blogSchema )
 