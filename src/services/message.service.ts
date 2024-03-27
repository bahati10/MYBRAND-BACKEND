import { Message } from "../models/message.model.js";

export class messageService {
    static sendMessage(value: any) {
        throw new Error('Method not implemented.')
    }

        //send a message
        async sendMessage(data: any) {
            try {
                const newMessage = await Message.create(data)
                return newMessage
    
            } catch (error) {
                console.log(error)
            }
        }
    
        //get all messages
        async getMessages() {
            try {
                const messages = await Message.find({})
                return messages
    
            } catch (error) {
                console.log(error)
            }
        }

     //get a single message
        async getMessage(id: string) {
      
            try {
                const message = await Message.findById({_id:id})
                if (!message) {
                    return 'Message not available'
                }
                return message

            } catch (error) {
                console.log(error)
            }
        }

        //delete a Message
        async deleteMessage(id: string) {
            try {
                const message = await Message.findByIdAndDelete(id)
                if (!message) {
                    return 'message not available'
                }
            } catch (error) {
                console.log(error)
            }
        }

}

export const messageServices = new messageService()