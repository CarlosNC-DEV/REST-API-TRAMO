import pool from '../database.js';

// CONDUCTORES HABILITADOS
export const conductorHabilitado = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoInhabilitadoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 1 AND habilitadoCON = 1 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoInhabilitadoCON IS NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron conductores habilitados");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const conductorHabilitadoUnico = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoInhabilitadoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 1 AND habilitadoCON = 1 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoInhabilitadoCON IS NULL AND idConductor=?;`, [req.params.id]);

        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontro el conductor habilitado");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

// INHABILITAR CONDUCTOR
export const inhabilitarConductor = async(req, res)=>{
    try {
        const inhabilitarCon = [{
            "habilitadoCON": 0,
            "motivoInhabilitadoCON": req.body.motivoInhabilitadoCON
        }]

        const [ rows ] = await pool.query(`UPDATE Tbl_Conductores SET ? WHERE idConductor=?`, [ inhabilitarCon[0], req.params.id]);

        if(rows.affectedRows == 1){
            res.json(rows);
        }else{
            res.status(200).json("No se pudo inhabilitar el conductor");
        }
        
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}


// CONDUCTORES INHABILITADOS
export const conductorInhabilitado = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoInhabilitadoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 1 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoInhabilitadoCON IS NOT NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron conductores inhabilitados");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const conductorInhabilitadoUnico = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoInhabilitadoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 1 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoInhabilitadoCON IS NOT NULL AND idConductor = ?`, [req.params.id]);

        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontro el conductor inhabilitado");
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

// HABALITAR CONDUCTOR
export const habilitarConductor = async (req, res)=>{
    try {
        const habilitarCon = [{
            "habilitadoCON": 1,
            "motivoInhabilitadoCON": null
        }];

        const [ rows ] = await pool.query(`UPDATE Tbl_Conductores SET ? WHERE idConductor=?`, [ habilitarCon[0], req.params.id]);
        
        if(rows.affectedRows == 1){
            res.json(rows);
        }else{
            res.status(200).json("No se pudo habilitar el conductor");
        }

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}