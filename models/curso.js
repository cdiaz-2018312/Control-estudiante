const {Schema, model} = require ('mongoose');
const CursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model ('Curso', CursoSchema);