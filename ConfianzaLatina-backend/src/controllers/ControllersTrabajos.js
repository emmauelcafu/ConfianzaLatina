const Trabajo = require('../models/trabajos'); 
 
const ControllersTrabajos = async({titulo, descripcion, empresa, ubicacion, salario})=>{
try {
    const nuevoTrabajo = await Trabajo.create({
        titulo,
        descripcion,
        empresa,
        ubicacion,
        salario,
    });
    return nuevoTrabajo ;
} catch (error) {
    console.error('Error al crear ControllersTrabajos:', error);
    res.status(500).json({ mensaje: 'Error al crear ControllersTrabajos', error });
}
}
const ControllersConsultaTrabajo = async ()=>{
   try {
    const trabajos = await Trabajo.findAll();
    return trabajos;
   } catch (error) {
    console.error('Error al listar Controllertrabajos:', error);
    res.status(500).json({ mensaje: 'Error al listar Controllertrabajos', error });
   }
}


module.exports ={
    ControllersTrabajos,ControllersConsultaTrabajo
}