const pool = require('../config/db');

exports.mostrarFormularioCrearCliente = (req, res) => {
    res.render('crearCliente');
};

exports.create = async (req, res) => {
    const { nombre, email, telefono } = req.body;
    try {
        await pool.query(
            'INSERT INTO clientes (nombre, email, telefono) VALUES ($1, $2, $3)',
            [nombre, email, telefono]
        );
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.render('clientes', { clientes: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.redirect('/clientes');
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        res.render('buscarClientes', { clientes: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarClientePorId = async (req, res) => {
    const { clientId } = req.query;
    if (isNaN(clientId)) {
        return res.status(400).json({ message: 'ID del cliente debe ser un número.' });
    }

    try {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [parseInt(clientId, 10)]);
        if (result.rows.length) {
            res.render('buscarClienteM', { cliente: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.mostrarFormularioEdicion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length) {
            res.render('editarCliente', { cliente: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
        await pool.query(
            'UPDATE clientes SET nombre = $1, email = $2, telefono = $3 WHERE id = $4',
            [nombre, email, telefono, id]
        );
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
