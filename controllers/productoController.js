const pool = require('../config/db');

// Mostrar formulario para crear un producto
exports.mostrarFormularioCrearProducto = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.render('crearProducto', { categorias: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
    const { nombre, precio, categoria_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO productos (nombre, precio, categoria_id) VALUES ($1, $2, $3)',
            [nombre, precio, categoria_id]
        );
        res.redirect('/productos');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los productos
exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT productos.*, categorias.nombre as categoria_nombre FROM productos LEFT JOIN categorias ON productos.categoria_id = categorias.id');
        res.render('productos', { productos: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.redirect('/productos');
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar formulario de edición de un producto
exports.mostrarFormularioEdicion = async (req, res) => {
    const { id } = req.params;
    try {
        const productoResult = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        const categoriasResult = await pool.query('SELECT * FROM categorias');
        if (productoResult.rows.length) {
            res.render('editarProducto', { producto: productoResult.rows[0], categorias: categoriasResult.rows });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria_id } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2, categoria_id = $3 WHERE id = $4',
            [nombre, precio, categoria_id, id]
        );
        res.redirect('/productos');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.buscarProductoPorId = async (req, res) => {
    const { productId } = req.query;
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'ID del producto debe ser un número.' });
    }

    try {
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [parseInt(productId, 10)]);
        if (result.rows.length) {
            res.render('buscarProductoM', { producto: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        res.render('buscarProductos', { productos: result.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};