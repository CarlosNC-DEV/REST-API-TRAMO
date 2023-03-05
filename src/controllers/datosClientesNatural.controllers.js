import pool from "../database.js";
import bcryptjs from 'bcryptjs';

export const crearClienteNT = async(req, res)=>{
  try {
    let idImgPerfilNT;
    let urlImgPerfilNT;

    const password = req.body.passwordNT; // Resivo la contraseña
    let passHaas = await bcryptjs.hash(password, 8); // Hago hass de la cobtraseña
    
    if(req.files.perfilImgNT){
        const perfilClienteNT = await uploadImagesClienteNatural(req.files.perfilImgNT.tempFilePath);
        await fs.remove(req.files.perfilImgNT.tempFilePath);

        // URL Y ID IMAGEN PERFIL CONDUCTOR
        idImgPerfilNT = perfilClienteNT.public_id;
        urlImgPerfilNT = perfilClienteNT.secure_url;
    }

    const clienteNatural = [{
      "nombrePNA": req.body.nombreNT,
      "apellidoPNA": req.body.apellidoNT,
      "tipoDocumentoPNA": req.body.tipoDicNT,
      "nroDocumentoPNA": req.body.nroDocumentoNT,
      "DireccionPNA": req.body.DireccionNT,
      "nroTelefonoPNA": req.body.nroTelefonoNT,
      "correoElectronicoPNA": req.body.correoElectronicoNT,
      "contrasenaPNA": passHaas,
      "idfotoPerfilPNA": idImgPerfilNT,
      "fotoPerfilPNA": urlImgPerfilNT
    }]

    if(clienteNatural){
        const [ rows ] = await pool.query(`INSERT INTO Tbl_PersonaNatural SET ?`, clienteNatural[0]);
        if (rows.affectedRows == 1) {
            res.status(200).json("Registro cliente natural exitoso");
        } else {
            res.status(505).json("No se pudo registrar el cliente natural");
        }
    }else {
         res.json("Por favor ingrese todos los datos");
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const datosClientesNaturalHB = async (req, res) => {
  try {
    const [ rows ] = await pool.query(`SELECT idPerNatural, idfotoPerfilPNA, fotoPerfilPNA, nombrePNA,apellidoPNA, nroTelefonoPNA,correoElectronicoPNA, DireccionPNA, calificacionPNA FROM Tbl_PersonaNatural WHERE habilitadoPNA=1 AND motivoInhabilitadoPNA IS NULL`);

    if (rows) {
      res.json(rows);
    } else {
      res.status(200).json("No se encontraron clientes naturales habilitados");
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const datosClientesNaturalUnicoHB = async (req, res) => {
  try {
    const [ rows ] = await pool.query(`SELECT idPerNatural, idfotoPerfilPNA, fotoPerfilPNA, nombrePNA,apellidoPNA, nroTelefonoPNA,correoElectronicoPNA, DireccionPNA, calificacionPNA FROM Tbl_PersonaNatural WHERE habilitadoPNA=1 AND idPerNatural = ?`, [req.params.id])
    
    if (rows) {
      res.json(rows[0]);
    } else {
      res.status(200).json("No se encontro un cliente natural habilitado");
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const inhabilitarClientePNA = async(req, res)=>{
  try {
      const inhabilitarPNA = [{
        "habilitadoPNA": 0,
        "motivoInhabilitadoPNA": req.body.motivoInhabilitadoPNA
      }]

      const [ rows ] = await pool.query(`UPDATE Tbl_PersonaNatural SET ? WHERE idPerNatural=?`, [ inhabilitarPNA[0], req.params.id]);
      
      if(rows.affectedRows == 1){
        res.json(rows);
      }else{
        res.status(200).json("No se pudo inhabilitar el cliente natural");
      }

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

//=================================================================

export const datosClientesNaturalIN = async (req, res) => {
  try {
    const [ rows ] = await pool.query(`SELECT idPerNatural, idfotoPerfilPNA, fotoPerfilPNA, nombrePNA,apellidoPNA, nroTelefonoPNA,correoElectronicoPNA, DireccionPNA, calificacionPNA, motivoInhabilitadoPNA FROM Tbl_PersonaNatural WHERE habilitadoPNA=0 AND motivoInhabilitadoPNA IS NOT NULL`);

    if (rows) {
      res.json(rows);
    } else {
      res.status(200).json("No se encontraron clientes naturales inhabilitados");
    }
      
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const datosClientesNaturaUnicolIN = async (req, res) => {
  try {
    const [ rows ] = await pool.query(`SELECT idPerNatural, idfotoPerfilPNA, fotoPerfilPNA, nombrePNA,apellidoPNA, nroTelefonoPNA,correoElectronicoPNA, DireccionPNA, calificacionPNA, motivoInhabilitadoPNA FROM Tbl_PersonaNatural WHERE habilitadoPNA=0 AND motivoInhabilitadoPNA IS NOT NULL AND idPerNatural = ?`, [req.params.id]);
    
    if (rows) {
      res.json(rows[0]);
    } else {
      res.status(200).json("No se encontro un cliente naturales inhabilitado");
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const habilitarClientePNA = async(req, res)=>{
  try {
      const inhabilitarPNA = [{
        "habilitadoPNA": 1,
        "motivoInhabilitadoPNA": null
      }]

      const [ rows ] = await pool.query(`UPDATE Tbl_PersonaNatural SET ? WHERE idPerNatural=?`, [ inhabilitarPNA[0], req.params.id]);
      
      if(rows.affectedRows == 1){
        res.json(rows);
      }else{
          res.status(200).json("No se pudo habilitar el cliente naturales");
      }

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}