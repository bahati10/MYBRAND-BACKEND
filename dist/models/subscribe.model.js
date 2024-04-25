import mongoose from 'mongoose';
import Joi from 'joi';
export const SubscribeschemaValidate = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    })
});
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});
export const Subscriber = mongoose.model('Subscriber', subscriberSchema);
