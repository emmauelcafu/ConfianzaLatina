const {ControllersTrabajos,ControllersConsultaTrabajo} = require('../controllers/ControllersTrabajos')
const HandlerTrabajo =async(req,res)=>{
    const { titulo, descripcion, empresa, ubicacion, salario } = req.body;
    try {
        const formTrabajo = await ControllersTrabajos({titulo, descripcion, empresa, ubicacion, salario})
        res.status(201).json(formTrabajo);
    } catch (error) {
        console.error('Error al crear trabajo:', error);
        res.status(500).json({ mensaje: 'Error al crear trabajo', error });
    }
}
const HandlerConsultaTrabajo = async (req,res)=>{
    try {
        const ConsultaTrabajo = await ControllersConsultaTrabajo()
        res.json(ConsultaTrabajo);
    } catch (error) {
        console.error('Error al listar Hanblertrabajos:', error);
        res.status(500).json({ mensaje: 'Error al listar Hanblertrabajos', error });
    }

}

module.exports={
    HandlerTrabajo,HandlerConsultaTrabajo
}