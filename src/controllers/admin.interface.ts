import { Request } from 'express';
import { DecodedUser } from '../middleware/adminAuth.middleware.js';

export interface CustomRequest extends Request {
    userData?: DecodedUser;
}
