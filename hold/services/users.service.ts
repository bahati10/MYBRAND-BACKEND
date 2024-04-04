import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { User } from '../../src/models/user.model.js';

dotenv.config();


//import module
export class userService {
    static createUser(value: any) {
        throw new Error('Method not implemented.')
    }
    //create a user
    async createUser(data: any) {
        try {
            
            const newUser = await User.create(data)
            return newUser
        

        } catch (error) {
            console.log(error)
        }
    }

        // Login a user
    async loginUser(email: string, password: string) {
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

        } catch (error) {
            console.log(error);
            throw new Error('Login failed');
        }
    }

    //get all users
    async getUsers() {
        try {
            const users = await User.find({}, { password: 0 })
            return users

        } catch (error) {
            console.log(error)
        }
    }

    //get a single user
    async getUser(id: string) {
      
        try {
            const user = await User.findById({_id:id}, { password: 0 })
            if (!user) {
                return 'user not available'
            }
            return user

        } catch (error) {
            console.log(error)
        }
    }

    //update a user
    async updateUser(id: string, data: any) {
        try {
                const userz = await User.findByIdAndUpdate({_id:id}, data, {new: true})                
                if(!userz){
                    return "user not available"
                }
                return userz          
        } catch (error) {
            console.log(error)
        }
    }

    //delete a user by using the find by id and delete 
    async deleteUser(id: string) {
        try {
            const user = await User.findByIdAndDelete(id)
            if (!user) {
                return 'user not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const userServices = new userService()
