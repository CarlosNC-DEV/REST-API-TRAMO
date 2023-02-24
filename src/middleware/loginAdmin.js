import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Obtener el token enviado por el cliente
  const token = req.headers.authorization?.split(' ')[1];

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      message: 'No se ha proporcionado un token de autenticación'
    });
  }

  // Verificar si el token es válido
  try {
    const decoded = jwt.verify(token, 'secreto');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'El token de autenticación proporcionado es inválido'
    });
  }
};
