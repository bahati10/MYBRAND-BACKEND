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
import { User, UserschemaValidate } from '../models/user.model.js';
import { userServices } from '../services/users.service.js';
import jwt from 'jsonwebtoken';
class userController {
    constructor() {
        //add user controller
        this.adduser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
            };
            const saltRounds = 10;
            try {
                const hashedPassword = yield bcrypt.hash(req.body.password, saltRounds);
                req.body.password = hashedPassword;
            }
            catch (error) {
                throw new Error('Error hashing password');
            }
            const { error, value } = UserschemaValidate.validate(data);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            const existingEmail = yield User.findOne({ email: value.email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already used' });
            }
            try {
                const hashedPassword = yield bcrypt.hash(value.password, 10);
                const newUser = yield userServices.createUser(Object.assign(Object.assign({}, value), { password: hashedPassword }));
                return res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ message: 'Failed to create user' });
            }
        });
        // Login a user
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userServices.loginUser(email, password);
                if (typeof user === 'string') {
                    res.status(401).json({ message: user });
                }
                else {
                    const token = jwt.sign({ userId: user._id, email: user.email, firstname: user.firstname }, process.env.JWT_SECRET || '', { expiresIn: process.env.EXPIRATION_TIME });
                    res.status(200).json({ message: "Logged in succesfully", token });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        //get all users
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield userServices.getUsers();
            res.json({ msg: users });
        });
        //get a single user
        this.getAUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //get id from the parameter
            const id = req.params.id;
            const user = yield userServices.getUser(id);
            res.json({ message: `User with id ${id} retrieved`, user });
        });
        //update user
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield userServices.updateUser(id, req.body);
            res.json({ msg: user });
        });
        //delete a user
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield userServices.deleteUser(id);
            res.json({ msg: 'User deleted successfully' });
        });
    }
}
//export class
export const UserController = new userController();
