const Noticia = require('../models/Noticias');

// Crear una nueva noticia
const crearNoticia = async (req, res) => {
  try {
    const { titulo, contenido, autor } = req.body;

    // Verificar si todos los campos son obligatorios
    if (!titulo || !contenido || !autor || !req.file) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios, incluyendo la imagen' });
    }

    // Ruta de la imagen
    const imagenRuta = req.file.path; // Ruta relativa donde se guarda la imagen

    // Crear noticia
    const noticia = await Noticia.create({ titulo, contenido, autor, imagenRuta });

    return res.status(201).json({ message: 'Noticia creada exitosamente', noticia });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la noticia' });
  }
};

// Obtener noticias
const obtenerNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    return res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las noticias' });
  }
};

module.exports = { crearNoticia, obtenerNoticias };
