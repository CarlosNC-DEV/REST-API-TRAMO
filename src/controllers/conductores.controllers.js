import pool from '../database.js';

export const conductoresDis = async(req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idConductor, nombreCON, nroTelefonoCON, calificacionCON, habilitadoCON, estadoCON, disponibilidadCON
        FROM Tbl_Conductores
        WHERE IngresoCON = 1 AND habilitadoCON = 1 AND estadoCON = 1 AND disponibilidadCON = 1`);

        if (rows && rows.length) {
            res.json(rows);
        } else {
            res.status(200).json({ message: "No se encontraron datos" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const conductoresEnServicio = async(req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idConductor, nombreCON, nroTelefonoCON, calificacionCON, habilitadoCON, estadoCON, disponibilidadCON FROM Tbl_Conductores WHERE IngresoCON = 1 AND habilitadoCON = 1 AND estadoCON = 1 AND disponibilidadCON = 0`);
        
        if (rows && rows.length) {
            res.json(rows);
        } else {
            res.status(200).json({ message: "No se encontraron datos" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}