//import modules
import { Request, Response } from 'express'
import { messageServices } from '../services/message.service.js';
import { MessageschemaValidate } from '../models/message.model.js';

class messageController {

    //add message controller
    sendmessage = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message,
        }
        const {error, value} = MessageschemaValidate.validate(data)

        if(error){
            res.json({ message: error })

        }else{
            const themessage = await messageServices.sendMessage(value)
            res.status(201).json({ message: "Message Sent successfully: ", themessage })          
        }
        
    }
    
    //get all messages
    getMessages = async (req: Request, res: Response) => {
        const theMessages = await messageServices.getMessages()
        res.json({ message: "Messages Retrieved successfully", theMessages })
    }

    //get a single message
    getAMessage = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const theMessage = await messageServices.getMessage(id)
        res.json({ message: "Message Retrieved successfully", theMessage })
    }

    //delete a message
    deleteMessage = async (req: Request, res: Response) => {
        const id = req.params.id
        await messageServices.deleteMessage(id)
        res.json({ message: 'Message Deleted successfully' })
    }

}

//export class
export const MessageController = new messageController()