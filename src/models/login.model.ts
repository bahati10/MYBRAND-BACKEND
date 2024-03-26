import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', UserSchema);
