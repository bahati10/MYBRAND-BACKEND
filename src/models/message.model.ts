//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

export const MessageschemaValidate = Joi.object({
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
    message: Joi.string().required(),
    createdAt: Joi.date().default(Date.now)

})

//creating an interface 
interface IMessage {
    firstname: string,
    lastname: string,
    email: string,
    message: string,
    createdAt: Date,
}

//Messageschema
const messageSchema = new Schema<IMessage>({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//creating a model
 export const Message = model<IMessage>('Message', messageSchema )
 