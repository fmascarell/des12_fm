import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

try {
  // Configuración de Cloudinary
  cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
  console.log('Cloudinary configurado correctamente');
} catch (error) {
  console.error('Error configurando Cloudinary:', error);
}

export { cloudinary };
