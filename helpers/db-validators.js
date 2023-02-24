const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido=async(rol = '')=>{
    const existeRol= await Role.findOne({rol});

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}

const emailExiste= async(correo = '') => {
    //verificamos si existe el correo
    const existeEmail= await Usuario.findOne({correo});

    //si existe (true) lanzamos una excepción
    if (existeEmail) {
        throw new Error(`El correo: ${ correo } ya existe  en la DB`);
    }
}

const existeUsuarioPorId= async (id)=>{
    //verificar si existe el id
    const existeuser = await Usuario.findById(id);
    if (!existeuser){
        throw new Error (`El id ${ id } no existe en la DB`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}