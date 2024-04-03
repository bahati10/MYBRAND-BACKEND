//importing modules
import  {Schema, model,} from 'mongoose'
import Joi, { boolean } from 'joi'

export const UserschemaValidate = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    isAdmin: Joi.boolean()
})

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
 