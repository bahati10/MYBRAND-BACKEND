import jwt from 'jsonwebtoken';
export const userLoginMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'You are not Authorised' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '');
        if (!decodedToken.userId) {
            throw new Error('UserId not found in decoded token');
        }
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
