const { request,response }= require ('express');

//operador rest u operador spread
const tieneRole=(...roles) => {

    return (req=request, res=response,next)=>{
        if (!req.usuario) {
            return res.status(500).json ({
                msg: 'se quiere validar el rol sin primero validar token'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: 'El servicio requiere uno de estos roles: ${ roles }'
            });
            
        }

        
        
        next();
    }
}

module.exports={
    tieneRole
}