const { ControllerPerfilUsuario,ControllerConsultarPerfilUsuario } = require("../controllers/ControllersPerfilUsuario");


    // guardad perfilusuario.
const HandlerPerfilUsuario = async (req,res)=>{
    const {nacionalidad,pasaporte,numeroTelefono,disponibilidad,edad,sexo,idioma,usuarioId}=req.body;
    
    try {
        formDataPerfil = await ControllerPerfilUsuario({nacionalidad,pasaporte,numeroTelefono,disponibilidad,edad,sexo,idioma,usuarioId});
       
       
        res.status(201).json({mensaje:'Usuario registrado', perfilUsusario: formDataPerfil})
    } catch (error) {
        res.status(400).json({mensaje: 'error al registrar perfilUsusario',  error: error.messaje});
    }
}

    // consoltar perfilsusuario.
const HandlerConsultarPerfilUsuario = async (req,res)=>{
    try {
        const consultaPerfil= await ControllerConsultarPerfilUsuario()
        
        res.json(consultaPerfil)
    } catch (error) {
        console.error('Error al listar HandlerConsultarPerfilUsuario:', error);
        res.status(500).json({mensaje:'Error al listar HandlerConsultarPerfilUsuario', error})
    }
}

module.exports={
    HandlerPerfilUsuario,
    HandlerConsultarPerfilUsuario
}; 