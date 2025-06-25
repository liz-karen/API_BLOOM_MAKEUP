//Middleware - Validación 
import { Request, Response, NextFunction } from "express";

//Validamos el body 
export function validatePorducts (
    req: Request,
    res: response,
    next: NextFuction
) 
{
//Exraemos las propiedades del body
const {name, brand, price, stock,category } = req.body;
//Validamos para ver si son correctas
if (
    typeof name !== 'string' ||
    typeof brand !== 'string' ||
    typeof price !== 'number' ||
    typeof stock !== 'number' ||
    typeof category !== 'string'
) {
    //Error 404 si es inválido
    return req.status(400).json({error: 'El producto es inválido' })
}
next();
}
