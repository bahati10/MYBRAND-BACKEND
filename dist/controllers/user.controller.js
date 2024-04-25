import bcrypt from 'bcryptjs';
import { User, UserschemaValidate } from '../models/user.model.js';
import { userServices } from '../services/users.service.js';
import jwt from 'jsonwebtoken';
class userController {
    //add user controller
    adduser = async (req, res) => {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin || false,
        };
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }
        catch (error) {
            throw new Error('Error hashing password');
        }
        const { error, value } = UserschemaValidate.validate(data);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const existingEmail = await User.findOne({ email: value.email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already used' });
        }
        try {
            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = await userServices.createUser({ ...value, password: hashedPassword });
            return res.status(201).json({ message: 'User created successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
    };
    // Login a user
    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userServices.loginUser(email, password);
            if (typeof user === 'string') {
                res.status(401).json({ error: "User Not Found" });
            }
            else {
                const token = jwt.sign({ userId: user._id, email: user.email, firstname: user.firstname }, process.env.JWT_SECRET || '', { expiresIn: process.env.EXPIRATION_TIME });
                res.status(200).json({ message: "Logged in successfully", token });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    // Login admin
    loginAdmin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userServices.loginAdmin(email, password);
            if (typeof user === 'string') {
                res.status(401).json({ message: user });
            }
            else {
                const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET_ADMIN || '', { expiresIn: process.env.EXPIRATION_TIME });
                res.status(200).json({ message: "Logged in successfully", token });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    //get all users
    getUsers = async (req, res) => {
        const users = await userServices.getUsers();
        res.json({ message: "Users retrieved successfully", users });
    };
    //get a single user
    getAUser = async (req, res) => {
        //get id from the parameter
        const id = req.params.id;
        const user = await userServices.getUser(id);
        res.json({ message: `User retrieved`, user });
    };
    //update user
    updateUser = async (req, res) => {
        const id = req.params.id;
        const user = await userServices.updateUser(id, req.body);
        res.json({ msg: user });
    };
    //delete a user
    deleteUser = async (req, res) => {
        const id = req.params.id;
        await userServices.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    };
}
//export class
export const UserController = new userController();
