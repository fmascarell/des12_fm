import { ProductsRepository, UsersRepository } from "../repositories/index.js";

export const existeEmail = async (email) => {
    const emailExiste = await UsersRepository.getUserByEmail(email);

    if(emailExiste)
        throw new Error(`El email ${email} ya está registrado`);
}

export const existeCode = async (code) => {
    const codeExiste = await ProductsRepository.getProductByCode(code);

    if(codeExiste)
        throw new Error(`El email ${code} ya está registrado`);
}

export const existeProduct = async (idProduct) => {
    const productExiste = await ProductsRepository.getProductById(idProduct);

    if(!productExiste)
        throw new Error(`El id ${idProduct} del producto no existe`);
}