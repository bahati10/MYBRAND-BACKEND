//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

export const UserschemaValidate = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
})

//creating an interface 
interface IUsers {
    firstname: string,
    lastname: string,
    email: string,
    password: string,

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
})

//creating a model
 export const User = model<IUsers>('User', userSchema )
 