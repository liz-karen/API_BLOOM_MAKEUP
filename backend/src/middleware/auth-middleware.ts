import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//Interfaz para definir que informacíon queremos
interface jwtPayLoad {
    id : string;
    usermane : string;
}
//Está es la clave para verificar el token
 const SECRET_KEY = process.env.JWT_SECRET || 'grupo_bloom';

 //Validamos el token
 export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
 ) 
 {
    //Obtenemos el valor de header
    const authHeader = req.headers['authorization']

    //Extraemos la palabra 'bearer' para solo usar el valor del token
    const token = authHeader && authHeader.split('')[1];

    //Usamos error 401 si el token no se envió
    if (!token) {
        return res.status(401).json({error: 'No se envió el token'})
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY) as jwtPayLoad;
        //En el request guardamos los datos del usuario
        (req as any).user = payload;

        //Middleware
        next();
    }   catch (error) {
        //Usamos error 403 si el token es inválido
        return res.status(403).json({error: 'Token inválido'});
    }
 }
