import jwt from 'jsonwebtoken';
export const userLoginMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'You are not Authorised' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '');
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
