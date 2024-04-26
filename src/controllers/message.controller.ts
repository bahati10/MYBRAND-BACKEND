//import modules
import { Request, Response } from 'express'
import nodemailer from 'nodemailer';
import { messageServices } from '../services/message.service.js';
import { MessageschemaValidate } from '../models/message.model.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
  });

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
        
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        } else {
            const themessage = await messageServices.sendMessage(value)

            const senderEmail = req.body.email;
                    // Send email notification
            await transporter.sendMail({
                from: senderEmail,
                to: 'bahatiyves10@gmail.com',
                subject: `New message received from ${data.firstname} ${data.lastname}`,
                text: `Message: ${data.message}`
          });
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