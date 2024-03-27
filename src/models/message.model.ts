//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

export const MessageschemaValidate = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required(),
})

//creating an interface 
interface IMessage {
    firstname: string,
    lastname: string,
    email: string,
    message: string,
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
    }
})

//creating a model
 export const Message = model<IMessage>('Message', messageSchema )
 