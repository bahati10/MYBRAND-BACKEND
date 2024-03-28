var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Message } from "../models/message.model.js";
export class messageService {
    static sendMessage(value) {
        throw new Error('Method not implemented.');
    }
    //send a message
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield Message.create(data);
                return newMessage;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get all messages
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield Message.find({});
                return messages;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get a single message
    getMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield Message.findById({ _id: id });
                if (!message) {
                    return 'Message not available';
                }
                return message;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //delete a Message
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield Message.findByIdAndDelete(id);
                if (!message) {
                    return 'message not available';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
export const messageServices = new messageService();
