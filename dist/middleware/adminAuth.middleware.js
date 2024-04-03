import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
export const adminLoginMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'You are not Authorised' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_ADMIN || '');
        if (!decodedToken.userId || !decodedToken.isAdmin) {
            throw new Error('Invalid credentials or not an admin');
        }
        const user = await User.findById(decodedToken.userId);
        if (!user || !user.isAdmin) {
            throw new Error('User not found or not an admin');
        }
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({ message: 'Invalid token or not an admin' });
    }
};
