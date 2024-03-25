import bcrypt from 'bcryptjs';
import { User, UserschemaValidate } from '../models/register.model.js';
import { userServices } from '../services/users.service.js';
class userController {
    constructor() {
        //add user controller
        this.adduser = async (req, res) => {
            const data = {
                names: req.body.names,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
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
            const existingUsername = await User.findOne({ username: value.username });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already used' });
            }
            if (existingUsername) {
                return res.status(400).json({ error: 'Username is already taken' });
            }
            try {
                const hashedPassword = await bcrypt.hash(value.password, 10);
                const newUser = await userServices.createUser({ ...value, password: hashedPassword });
                return res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ message: 'Failed to create user' });
            }
        };
        // Login a user
        this.loginUser = async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await userServices.loginUser(email, password);
                if (typeof user === 'string') {
                    res.status(401).json({ message: user });
                }
                else {
                    // const token = jwt.sign(
                    //     { userId: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET || '',
                    //     { expiresIn: process.env.EXPIRATION_TIME } 
                    // );
                    res.status(200).json({ user });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        };
        //get all users
        this.getUsers = async (req, res) => {
            const users = await userServices.getUsers();
            res.json({ msg: users });
        };
        //get a single user
        this.getAUser = async (req, res) => {
            //get id from the parameter
            const id = req.params.id;
            const user = await userServices.getUser(id);
            res.json({ message: `User with id ${id} retrieved`, user });
        };
        //update user
        this.updateUser = async (req, res) => {
            const id = req.params.id;
            const user = await userServices.updateUser(id, req.body);
            res.json({ msg: user });
        };
        //delete a user
        this.deleteUser = async (req, res) => {
            const id = req.params.id;
            await userServices.deleteUser(id);
            res.json({ msg: 'User deleted successuly' });
        };
    }
}
//export class
export const UserController = new userController();