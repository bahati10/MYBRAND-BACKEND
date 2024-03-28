var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { User } from '../models/user.model.js';
dotenv.config();
//import module
export class userService {
    static createUser(value) {
        throw new Error('Method not implemented.');
    }
    //create a user
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield User.create(data);
                return newUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Login a user
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                return 'Please fill all inputs provided';
            }
            try {
                const user = yield User.findOne({ email });
                if (!user) {
                    return 'User not found';
                }
                const isPasswordMatch = yield bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    return 'Invalid credentials';
                }
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error('Login failed');
            }
        });
    }
    //get all users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find({}, { password: 0 });
                return users;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get a single user
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findById({ _id: id }, { password: 0 });
                if (!user) {
                    return 'user not available';
                }
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //update a user
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userz = yield User.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!userz) {
                    return "user not available";
                }
                return userz;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //delete a user by using the find by id and delete 
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByIdAndDelete(id);
                if (!user) {
                    return 'user not available';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
//export the class
export const userServices = new userService();
