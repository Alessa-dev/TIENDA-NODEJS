/* const pool = require('../config/db');

exports.mostrarFormularioCrear = (req, res) => {
    res.render('crearCategoria'); // Ajusta el nombre de la plantilla según tu estructura de archivos
};

exports.create = async (req, res) => {
    const { nombre } = req.body;
    try {
        await pool.query(
            'INSERT INTO categorias (nombre) VALUES ($1)',
            [nombre]
        );
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.render('categorias', { categorias: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.mostrarFormularioEdicion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
        if (result.rows.length) {
            res.render('editarCategoria', { categoria: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        await pool.query(
            'UPDATE categorias SET nombre = $1 WHERE id = $2',
            [nombre, id]
        );
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.redirect('/categorias');
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 */

const pool = require('../config/db');

exports.mostrarFormularioCrearCategoria = (req, res) => {
    res.render('crearCategoria'); // Ajusta el nombre de la plantilla según tu estructura de archivos
};

exports.create = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        await pool.query(
            'INSERT INTO categorias (nombre) VALUES ($1)',
            [nombre, descripcion]
        );
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.render('categorias', { categorias: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.redirect('/categorias');
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
        res.render('buscarCategorias', { categorias: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarCategoriaPorId = async (req, res) => {
    const { categoryId } = req.query;
    if (isNaN(categoryId)) {
        return res.status(400).json({ message: 'ID de la categoría debe ser un número.' });
    }

    try {
        const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [parseInt(categoryId, 10)]);
        if (result.rows.length) {
            res.render('buscarCategoriaM', { categoria: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.mostrarFormularioEdicion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
        if (result.rows.length) {
            res.render('editarCategoria', { categoria: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        await pool.query(
            'UPDATE categorias SET nombre = $1, WHERE id = $2',
            [nombre, descripcion, id]
        );
        res.redirect('/categorias'); // Redireccionar a la lista de categorías después de la actualización
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
