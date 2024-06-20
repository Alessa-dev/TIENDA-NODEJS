const pool = require('../config/db');

exports.mostrarFormularioCrearUsuario = (req, res) => {
    res.render('crearUsuario'); 
};

exports.create = async (req, res) => {
    const { nombre, email, usuario, password } = req.body;
    try {
        await pool.query(
            'INSERT INTO usuarios (nombre, email, usuario, password) VALUES ($1, $2, $3, $4)',
            [nombre, email, usuario, password]
        );
        res.render('index');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.render('usuarios', { usuarios: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.redirect('/usuarios');
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        res.render('buscarUsuarios', { usuarios: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarUsuarioPorId = async (req, res) => {
    const { userId } = req.query;
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID del usuario debe ser un número.' });
    }

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [parseInt(userId, 10)]);
        if (result.rows.length) {
            res.render('buscarUsuarioM', { usuario: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.mostrarFormularioEdicion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length) {
            res.render('editarUsuario', { usuario: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
        await pool.query(
            'UPDATE usuarios SET nombre = $1, email = $2, usuario = $3, password =$4 WHERE id = $5',
            [nombre, email, telefono, id]
        );
        res.redirect('/usuarios'); // Redireccionar a la lista de usuarios después de la actualización
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
