import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    try {
        return jwt.sign({ ...user}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    } catch (error) {
        console.log(error);
        throw error;
    }
}