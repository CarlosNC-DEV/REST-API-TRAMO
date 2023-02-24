// Middleware para verificar si el usuario está autenticado
export const authMiddleware = (req, res, next) => {
    if (req.session.isLoggedIn) {
      next();
    } else {
      res.json('No inicio sesion como administrador');
    }
};