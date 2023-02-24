const{request, response, next}= require('express');
const jwt=require('jsonwebtoken');
const Usuario= require('../models/usuario');


const validarJWT= async(req=request,res=response,next)=>{
    const token=req.header('x-token');
    

    if (!token) {
        return res.status(401).json ({
            msg: 'no hat token en la petición'
        })
    }

    try {
        const { uid }= jwt.verify(token,process.env.SECRET_KEY_FOR_TOKEN);
       const usuario= await Usuario.findById(uid);
        //verificar si el uid de user no existe
       if (!usuario) {
        return res.status(401).json ({
            msg: 'token no valido, no existe el user'
        })
       }
       //verificar si esta en falso
       if (!usuario.estado) {
        return res.status(401).json ({
            msg: 'usuario en estado falso'
        })
       }
        req.usuario=usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json ({
            msg: 'token no valido'
        })
    }

    
}
module.exports={
    validarJWT
}