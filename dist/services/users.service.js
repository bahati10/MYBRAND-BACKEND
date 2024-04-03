import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { User } from '../models/user.model.js';
dotenv.config();
//import module
export class userService {
    static createUser(value) {
        throw new Error('Method not implemented.');
    }
    async createUser(data) {
        try {
            const { firstname, lastname, email, password, isAdmin } = data;
            const newUser = await User.create({ firstname, lastname, email, password, isAdmin });
            return newUser;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to create user');
        }
    }
    // Login a user
    async loginUser(email, password) {
        if (!email || !password) {
            return 'Please fill all inputs provided';
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return 'User not found';
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return 'Invalid credentials';
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error('Login failed');
        }
    }
    // Login admin
    async loginAdmin(email, password) {
        if (!email || !password) {
            return 'Please fill all inputs provided';
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return 'User not found';
            }
            if (user.email === "admin@email.com") {
                console.log("Admin user logged in");
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return 'Invalid credentials';
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error('Login failed');
        }
    }
    //get all users
    async getUsers() {
        try {
            const users = await User.find({}, { password: 0 });
            return users;
        }
        catch (error) {
            console.log(error);
        }
    }
    //get a single user
    async getUser(id) {
        try {
            const user = await User.findById({ _id: id }, { password: 0 });
            if (!user) {
                return 'user not available';
            }
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    //update a user
    async updateUser(id, data) {
        try {
            const userz = await User.findByIdAndUpdate({ _id: id }, data, { new: true });
            if (!userz) {
                return "user not available";
            }
            return userz;
        }
        catch (error) {
            console.log(error);
        }
    }
    //delete a user by using the find by id and delete 
    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return 'user not available';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
//export the class
export const userServices = new userService();
