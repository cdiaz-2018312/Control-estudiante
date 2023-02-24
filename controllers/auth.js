const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        // primer verificacion; ver si el email existe 
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Password son incorrectos'
            });
        }
        // si el usuario esta en estado false
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no existe(inactivo)'
            });
        }

        //verificar Contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario o Password son incorrectos(password incorrecta)'
            })
        }
        //generar JWT
         const token = await generarJWT(usuario.id);
        

        res.json({
            msg: 'Login PATH',
           token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el admin (backend)'
        })
    }
}


module.exports = {
    login
}