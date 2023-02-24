const {Router} = require('express');
const { check } = require('express-validator');
//controlers
const { login } = require('../controllers/auth');
//middlewares
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//manejo de las rutas
router.post('/login',[

    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'la contra es obligatoria y debe de tener 6 caracteres').not().isEmpty().isLength({min: 6}),
    validarCampos,
],login);


module.exports = router;