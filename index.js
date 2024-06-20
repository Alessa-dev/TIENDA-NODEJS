// index.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productosRoutes = require('./routes/productosRoutes');
const auth = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Necesario para recibir datos de formularios
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mi_secreto', 
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');

// Middleware para verificar la sesión del usuario
const requireLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); // Si está autenticado, pasa al siguiente middleware o ruta
    } else {
        res.redirect('/login'); // Si no está autenticado, redirige al login
    }
};



app.get('/index', requireLogin, (req, res) => {
    res.render('index', { username: req.session.username });
});
app.use('/', auth);
app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/productos', productosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});