import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

try {
  // Configuración de Cloudinary
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  console.log('Cloudinary configurado correctamente');

} catch (error) {
  console.error('Error configurando Cloudinary:', error);
}

export { cloudinary };
