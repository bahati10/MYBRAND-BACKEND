import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../controllers/user.interface.js';

export interface DecodedUser {
    userId: string;
    email: string;
    username: string;
}


export const userLoginMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    // console.log('Received Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'You are not Authorised' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedUser; 
        // console.log('Decoded Token:', decodedToken);
        req.userData = decodedToken;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
