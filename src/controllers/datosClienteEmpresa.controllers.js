import pool from "../database.js";
import bcryptjs from 'bcryptjs';

export const crearClientePJU = async(req, res)=>{
  try {
    let idImgPerfilPJU;
    let urlImgPerfilPJU;

    const password = req.body.passwordPJU; // Resivo la contraseña
    let passHaas = await bcryptjs.hash(password, 8); // Hago hass de la cobtraseña

    if(req.files.perfilImgPJU){
        const perfilClienteNT = await uploadImagesClienteEmpresa(req.files.perfilImgPJU.tempFilePath);
        await fs.remove(req.files.perfilImgPJU.tempFilePath);

        // URL Y ID IMAGEN PERFIL CONDUCTOR
        idImgPerfilPJU = perfilClienteNT.public_id;
        urlImgPerfilPJU = perfilClienteNT.secure_url;
    }

    const clienteEmpresa = [{
      "nombreEmpresa": req.body.nombrePJU,
      "razonSocialEmpresa": req.body.razonSocialPJU,
      "nomRepresentanteLegal": req.body.nomRepresentantePJU,
      "NITempresa": req.body.NITempresa,
      "DireccionEmpresa": req.body.DireccionPJU,
      "nroTelefonoPJU": req.body.nroTelefonoPJU,
      "correoElectronicoPJU": req.body.correoElectronicoPJU,
      "contrasenaPJU": passHaas,
      "idfotoPerfilPJU": idImgPerfilPJU,
      "fotoPerfilPNA": urlImgPerfilPJU
    }];

    if(clienteEmpresa){
        const [ rows ] = await pool.query(`INSERT INTO Tbl_PersonaJuridica SET ?`, clienteEmpresa[0]);
        if (rows.affectedRows == 1) {
            res.status(200).json("Registro cliente empresa exitoso");
        } else {
            res.status(505).json("No se pudo registrar el cliente empresa");
        }
    }else {
         res.json("Por favor ingrese todos los datos");
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const datosClientesEmpresaHB = async (req, res) => {
    try {
        const [ rows ] = await pool.query(`SELECT idPerJuridica, idfotoPerfilPJU, fotoPerfilPNA, nombreEmpresa, nroTelefonoPJU, correoElectronicoPJU, DireccionEmpresa, calificacionPJU, NITempresa FROM Tbl_PersonaJuridica WHERE habilitadoPJU=1 AND motivoInhabilitadoPJU IS NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron clientes empresa habilitados");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
export const datosClientesEmpresaUnicoHB = async (req, res) => {
    try {
        const [ rows ] = await pool.query(`SELECT idPerJuridica, idfotoPerfilPJU, fotoPerfilPNA, nombreEmpresa, nroTelefonoPJU, correoElectronicoPJU, DireccionEmpresa, calificacionPJU, NITempresa FROM Tbl_PersonaJuridica WHERE habilitadoPJU=1 AND motivoInhabilitadoPJU IS NULL AND idPerJuridica=?`, [req.params.id])
        
        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontro un cliente empresa habilitado");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
export const inhabilitarClientePJU = async(req, res)=>{
    try {
        const inhabilitarPJU = [{
            "habilitadoPJU": 0,
            "motivoInhabilitadoPJU": req.body.motivoInhabilitadoPJU
        }];

        const [ rows ] = await pool.query(`UPDATE Tbl_PersonaJuridica SET ? WHERE idPerJuridica=?`, [ inhabilitarPJU[0], req.params.id])
        
        if(rows.affectedRows == 1){
            res.json(rows);
        }else{
            res.status(200).json("No se pudo inhabilitar el cliente empresa");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
  
  //=================================================================
  
export const datosClientesEmpresaIN = async (req, res) => {
    try {
        const [ rows ] = await pool.query(`SELECT idPerJuridica, idfotoPerfilPJU, fotoPerfilPNA, nombreEmpresa, nroTelefonoPJU, correoElectronicoPJU, DireccionEmpresa, calificacionPJU, NITempresa, motivoInhabilitadoPJU FROM Tbl_PersonaJuridica WHERE habilitadoPJU=0 AND motivoInhabilitadoPJU IS NOT NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron clientes empresa inhabilitados");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
export const datosClientesEmpresaUnicoIN = async (req, res) => {
    try {
        const [ rows ] = await pool.query(`SELECT idPerJuridica, idfotoPerfilPJU, fotoPerfilPNA, nombreEmpresa, nroTelefonoPJU, correoElectronicoPJU, DireccionEmpresa, calificacionPJU, NITempresa, motivoInhabilitadoPJU FROM Tbl_PersonaJuridica WHERE habilitadoPJU=0 AND motivoInhabilitadoPJU IS NOT NULL AND idPerJuridica=?`, [req.params.id]);

        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontro un cliente empresa inhabilitado");
        }
       
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
export const habilitarClientePJU = async(req, res)=>{
    try {
        const habilitarPJU = [{
            "habilitadoPJU": 1,
            "motivoInhabilitadoPJU": null
        }];

        const [ rows ] = await pool.query(`UPDATE Tbl_PersonaJuridica SET ? WHERE idPerJuridica=?`, [ habilitarPJU[0], req.params.id]);
        
        if(rows.affectedRows == 1){
            res.json(rows);
        }else{
            res.status(200).json("No se pudo HABILITAR el cliente empresa");
        }

    } catch (error) {
    return res.status(500).json({ message: error.message });
    }
}