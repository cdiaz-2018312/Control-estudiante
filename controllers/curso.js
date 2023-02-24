const {response,request}= require ('express');
const Curso = require ('../models/curso');

const getCurso = async (req = request, res=response) => {
    //condiciones del get(solo cursos en estado activo)
    const query = {estado:true};

    const listaCurso = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
    ]);
    res.json({
        msg: 'get api - controlador Cursos',
    listaCurso
    });
}

    const postCurso= async (req=request, res=response)=> {
        //desestructuracion
        const {nombre, descripcion} = req.body; 
        const cursoGuardadoDB= new Curso ({nombre,descripcion}); 

        //guardar en la db
        await cursoGuardadoDB.save();

        res.json({
            msg: 'post api - agregar curso',
            cursoGuardadoDB
        });
    }

    const putCurso = async(req= request, res=response)=>{
        //req params sirve para traer parametros de las rutas
        const {id}=req.params;
        const{_id,...resto}= req.body;
        //editar usuario por id
        const cursoEditado = await Curso.findByIdAndUpdate(id,resto);

        res.json({
            msg: 'Put api Editar Curso',
            cursoEditado
        });
    }

    const deleteCurso = async(req=request,res=response)=>{
        const {id}= req.params;

        //cambiar el estado del curso para no borrarlo fisicamente
        const cursoEliminado= await Curso.findByIdAndUpdate(id, {estado:false});
        //const usuarioEliminado = await Usuario.findByIdAndDelete( id);
       
        res.json({
            msg: 'DELETE api eliminar Curso',
            cursoEliminado
        });   
    }

    module.exports={
        getCurso,
        postCurso,
        putCurso,
        deleteCurso
    }



