const { Router } = require('express');
const { check } = require('express-validator');
const { getByIdUsuarioCurso, postUsuarioCurso } = require('../controllers/usuario_curso');
const {  existeUsuarioPorId } = require('../helpers/db-validators');
const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarJWT');



const router = Router();

router.get('/mostrarPorId/:id', [
    check('id','no es valido el id').isMongoId(),
    check('id').custom(existeUsuarioPorId)
],getByIdUsuarioCurso);

router.post('/agregar', [
    validarJWT,
    tieneRole('ALUMNO_ROLE'),

] ,postUsuarioCurso);





module.exports = router;