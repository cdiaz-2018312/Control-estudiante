const {Schema, model} = require ('mongoose');

const UsuarioCursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    cursos: [{
        curso: 
        {type: String, default: '0' }
        }]
});

module.exports = model('Usuario_Curso', UsuarioCursoSchema);