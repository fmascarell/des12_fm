import mongoose from 'mongoose';    

export const dbConnection = async () => {
    try {
        const uri = process.env.URI_MONGODB;
        await mongoose.connect(uri);
        console.log('Se ha conectado a la Base de datos online');
    } catch (error) {
        console.log(`Error de conexión ${error}`);
        process.exit(1);
    }
};