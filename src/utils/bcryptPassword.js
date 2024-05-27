import bcryptjs from 'bcrypt';

export const createHash = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const passHash = bcryptjs.hashSync(password, salt);
    return passHash;
};

export const isValidPassword = (password, passwordHash) => {
    const passValid = bcryptjs.compareSync(password, passwordHash);
    return passValid;
}