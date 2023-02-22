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
        res.status(200).json({ message: "Registro exitoso" });
      } else {
        res.status(505).json({ message: "No se pudo registrar este usuario" });
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
        res.status(200).json({ message: "CORREO y/o CONTRASEÑA incorrecta" });
      } else {
        req.session.loggedin = true;
        req.session.name = rows[0].correoAdmin;
        res.status(200).json({ message: "Bienvenido administrador TRAMO" });
      }
    } else {
      res.status(200).json({ message: "¡Por favor, llene todos los campos requeridos!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CONTROLAR QUE LA SESION ESTE ABIERTA EN TODAS LAS VISTAS DE ADMINBISTRADOR TRAMO

export const controlerAdmin = (req, res) => {
  try {
    if (req.session.loggedin) {
      res.json({
        login: req.session.loggedin,
        nombreAdmin: req.session.name,
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
    req.session.destroy(() => {
      res.json({
        login: false,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
