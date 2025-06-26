//Middleware - Error
import { Request, Response, NextFunction } from "express";

//Vemos los errores
import function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
){
    console.error(err);

    //Verficamos si el error esta en el JSON
    if (err.name === 'SyntaxError' && err.status 400 && 'body in err) {
        return res.status(400).json({error: 'Error: JSON incorrecto'});
    }
    //Agregamos si se encuentran otro errores
    res.status(err.status || 500).json({
        error: err.message || 'Error en el servidor interno',
    });
}
