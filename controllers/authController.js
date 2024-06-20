
const pool = require('../config/db');

exports.showLoginPage = (req, res) => {
    res.render('login');
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {

        const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1 AND password = $2', [username, password]);


        if (result.rows.length > 0) {

            req.session.isLoggedIn = true;
            req.session.username = username;
            res.redirect('index'); 
        } else {

            res.redirect('/login'); 
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/login'); // Redirige al login después de cerrar sesión
    });
};
