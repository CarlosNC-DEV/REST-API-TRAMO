import pool from "../database.js";
import bcryptjs from "bcryptjs";

// CREAR UN NUEVO ADMINISTRADOR TRAMO
export const createAdmin = async (req, res) => {
  try {
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const password = req.body.password;
    let passHaas = await bcryptjs.hash(password, 8);

    if (correo && usuario && password) {
      const [rows] = await pool.query(`INSERT INTO Tbl_Administradores SET ?`, { correoAdmin: correo, Usuario: usuario, Contrasena: passHaas});
      if (rows.affectedRows == 1) {
        res.json("Registro exitoso");
      } else {
        res.json("No se pudo registrar este usuario");
      }
    } else {
      res.json("Por favor ingrese todos los datos");
    }
  } catch (error) {
    return res.status(505).json({ message: error.message });
  }
};

// VALIDAR EL IGRESO AL MODULO ADMINISTRADOR TRAMO
export const autenticacionAdmin = async (req, res) => {
  try {
    const correoAdmin = req.body.correoAdmin;
    const adminContra = req.body.passwordAdmin;

    let passHaas = await bcryptjs.hash(adminContra, 8);

    if (correoAdmin && adminContra) {
      const [rows] = await pool.query(`SELECT * FROM Tbl_Administradores WHERE correoAdmin=?`, [correoAdmin]);
      if ( rows.length == 0 || !(await bcryptjs.compare(adminContra, rows[0].Contrasena))) {
        res.json({
          alert: true,
          alertTitle: "Error",
          alertMessage: "USUARIO y/o CONTRASEÑA incorrecta",
          alertIcon:'error',
          showConfirmButton: true,
          timer: false,
          ruta: '/login'    
      });
      } else {
        res.cookie('token', 'myAuthToken', { maxAge: 3600000, httpOnly: true });
        req.session.isLoggedIn = true;
        req.session.name = rows[0].Usuario;
        res.json({
          alert: true,
          alertTitle: "Bienvenido administrador TRAMO",
          alertMessage: " ¡LOGIN CORRECTO! ",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: '/dashboard'
      });
      }
    } else {
      res.json({
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: " ¡Por favor, llene los campos requeridos! ",
        alertIcon: "warning",
        showConfirmButton: true,
        timer: false,
        ruta: '/login'
    });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// // CONTROLAR QUE LA SESION ESTE ABIERTA EN TODAS LAS VISTAS DE ADMINISTRADOR TRAMO

export const controlerAdmin = (req, res) => {
  try {
    if (req.cookies.token === 'myAuthToken') {
      res.json({
        login: true
      });
    } else {
      res.json({
        login: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CERRAR SESIÓN DEL MODULO ADMINISTRADOR
export const cerraSesion = (req, res) => {
  try {
    res.clearCookie('token');
    req.session.destroy(() => {
      res.json({
        login: false,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
