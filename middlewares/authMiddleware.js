// middlewares/authMiddleware.js

exports.requireLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
      next(); // Si está autenticado, pasa al siguiente middleware o ruta
    } else {
      res.redirect('/login'); // Si no está autenticado, redirige al login
    }
  };
  