//importing modules
import { Schema, model, } from 'mongoose';
import Joi from 'joi';
export const BlogschemaValidate = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    content: Joi.string().required(),
    createdAt: Joi.date().default(Date.now)
});
//Blogschema
const blogSchema = new Schema({
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
        default: 'Bahati Yves'
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});
//creating a model
export const Blog = model('Blog', blogSchema);
