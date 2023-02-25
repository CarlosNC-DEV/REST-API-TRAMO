import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Obtener el token enviado por el cliente
  const token = req.headers.authorization?.split(' ')[1];

  // Verificar si el token existe
  if (!token) {
    return res.redirect('http://localhost:5173/pagina404');
  }

  // Verificar si el token es válido
  try {
    const decoded = jwt.verify(token, 'secreto');
    req.userId = decoded.id;
    req.userName = decoded.name;
    next();
  } catch (error) {
    return res.redirect('http://localhost:5173/pagina404');
  }
};
