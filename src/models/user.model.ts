//importing modules
import  {Schema, model,} from 'mongoose'
import Joi, { boolean } from 'joi'

export const UserschemaValidate = Joi.object({
    firstname: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
        'string.empty': 'First name is required.',
        'string.pattern.base': 'First name must contain only letters.',
        'any.required': 'First name is required.'
    }),
    lastname: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
        'string.empty': 'Last name is required.',
        'string.pattern.base': 'Last name must contain only letters.',
        'any.required': 'Last name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).required().min(8).messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long.',
        'any.required': 'Password is required.'
    }),
    isAdmin: Joi.boolean()
});



//creating an interface 
interface IUsers {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    isAdmin: boolean
}

//Userschema
const userSchema = new Schema<IUsers>({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
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
    isAdmin: {
        type: Boolean,
        default: false 
    }
})

//creating a model
 export const User = model<IUsers>('User', userSchema )
 