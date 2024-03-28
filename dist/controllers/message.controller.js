var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { messageServices } from '../services/message.service.js';
import { MessageschemaValidate } from '../models/message.model.js';
class messageController {
    constructor() {
        //add message controller
        this.sendmessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //data to be saved in database
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                message: req.body.message,
            };
            const { error, value } = MessageschemaValidate.validate(data);
            if (error) {
                res.json({ message: error });
            }
            else {
                const themessage = yield messageServices.sendMessage(value);
                res.status(201).json({ message: "Message Sent successfully: ", themessage });
            }
        });
        //get all messages
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const theMessages = yield messageServices.getMessages();
            res.json({ message: "Messages Retrieved successfully : ", theMessages });
        });
        //get a single message
        this.getAMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //get id from the parameter
            const id = req.params.id;
            const theMessage = yield messageServices.getMessage(id);
            res.json({ msg: "Message Retrieved successfully", theMessage });
        });
        //delete a message
        this.deleteMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield messageServices.deleteMessage(id);
            res.json({ message: 'Message Deleted successfully' });
        });
    }
}
//export class
export const MessageController = new messageController();
