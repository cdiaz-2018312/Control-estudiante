const {response,request}= require ('express');
const usuario_curso = require ('../models/usuario_curso');


const getByIdUsuarioCurso = async (req = request, res=response) => {
    const {id}=req.params;
    const listaUsuarioCurso =  usuario_curso.findById(id)
    res.json({
        msg: 'get api - controlador usuario_Cursos',
    listaUsuarioCurso
    });
}

    const postUsuarioCurso= async (req=request, res=response)=> {
        //desestructuracion
        const body = req.body; 
        let error;
        let cursos = JSON.parse(body.cursos);
        
        cursos.forEach(curso => {
            usuario_curso.updateMany({_id: body._id,},{
                $push:{
                    'cursos':{
                        curso:curso
                    }
                }
            },
            (error)=>{
                if (error) {
                    error=error
                }
            }
             
        )
    });

       

        if (error){
            return res.json({succes: false,
            msj: 'no se pudieron añadir los cursos'
        });

        }else{
            return  res.json({
                msg: 'post api - agregar Usuario_curso',
                
            });
        }
        //const cursoGuardadoDB= new Curso ({nombre,descripcion}); 

        //guardar en la db
        //await cursoGuardadoDB.save();

       
    }

    

    module.exports={
        getByIdUsuarioCurso,
        postUsuarioCurso
    }