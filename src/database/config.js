import mongoose from 'mongoose';    

export const dbConnection = async() => {
    try{
        await mongoose.connect('mongodb+srv://franmascarell:AP3maM13mBELB4wX@cluster0.wai2ttw.mongodb.net/ecommerce');
        console.log('Se ha conectado a la Base de datos online');
    }
    catch(error){
        console.log(`Error de conexión ${error}`);
        process.exit(1);
    }
}