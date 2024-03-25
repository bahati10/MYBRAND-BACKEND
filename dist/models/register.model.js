//importing modules
import { Schema, model, } from 'mongoose';
import Joi from 'joi';
export const UserschemaValidate = Joi.object({
    names: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
});
//Userschema
const userSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});
//creating a model
export const User = model('User', userSchema);
