import { Request } from 'express';
import { DecodedUser } from '../middleware/userlogin.middleware.js'

export interface CustomRequest extends Request {
    userData?: DecodedUser;
}
