import { response, request } from 'express';

export const loginUsuario = (req = request, res=response) => {
    try {
        return res.json({ok: true, msg: 'loginUsuario'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Por favor contactese con un administrador'});
    }
}

export const crearUsuario = (req = request, res=response) => {
    try {
        return res.json({ok: true, msg: 'crearUsuario'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Por favor contactese con un administrador'});
    }
}