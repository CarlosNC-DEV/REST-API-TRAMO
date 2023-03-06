// Invocamos a la conexion de la DB
import pool from '../database.js';
//Invocamos a bcrypt
import bcryptjs from 'bcryptjs';
//Invocamos a cloudinary
import cloudinary from 'cloudinary';
// crear solicitud

export const PurbeCreate =  (req, res) => {
    const files = Object.values(req.files).map(file => file[0].originalname).join(', ');
    const data = JSON.stringify(req.body);
    const message = `Se recibieron los siguientes archivos: ${files}. Los siguientes datos se enviaron: ${data}`;
    
    // Procese los archivos y datos aquí
    res.send(message);
};

export const createSoli =  async (req, res)=>{
    try {

        let idImgPerfilCon;
        let urlImgPerfilCon;

        const password = req.body.password; // Resivo la contraseña
        let passHaas = await bcryptjs.hash(password, 8); // Hago hass de la cobtraseña

        if(req.files){
            const perfilCon = await cloudinary.uploader.upload(req.files.perfilImgCon[0].path);

            // URL Y ID IMAGEN PERFIL CONDUCTOR
            idImgPerfilCon = perfilCon.public_id;
            urlImgPerfilCon = perfilCon.secure_url;
        }else{
            return res.status(400).send("Problema en Perfil");
        }

        const tablaConductor = [{
            "idfotoperfilCON": idImgPerfilCon,
            "fotoperfilCON": urlImgPerfilCon,
            "nombreCON": req.body.nombres,
            "apellidoCON": req.body.apellidos,
            "usuarioCON": req.body.usuario,
            "tipo_DocumentoCON": req.body.tipoIdentificacion,
            "nroDocumentoCON": req.body.numIdentificacion,
            "nacionalidadCON": req.body.nacionalidad,
            "DireccionResidenciaCON": req.body.direccionCon,
            "ciudadCON": req.body.ciudadCon,
            "fechaNacimientoCON": req.body.fechaNacimiento,
            "nroTelefonoCON": req.body.numTelefono,
            "correoElectronicoCON": req.body.correoElectronico,
            "correoRecuperacionCON": req.body.correoRecuperacion,
            "nroLicenciaCON": req.body.numLicencia,
            "contrasenaCON": passHaas,
            "preguntaSeguridadCON": req.body.preguntaSeg,
            "respuestaSeguridadCON": req.body.respuestaSeg
        }];


        if(tablaConductor){
            const [ rows ] = await pool.query(`INSERT INTO Tbl_Conductores SET ?`, tablaConductor[0]);
            if(rows.affectedRows == 0){
                return res.status(505).send("No se pudo registrar el conductor");
            }else if(rows.affectedRows == 1){
                req.idConductor = rows.insertId
                const tablaContactoEMG = [{
                    "nombreCEM": req.body.nombresConEmg,
                    "apellidoCEM": req.body.apellidosConEmg,
                    "NroDocumentoCEM": req.body.numDocConEmg,
                    "NroTelefonoCEM": req.body.numTelConEmg,
                    "CorreoElectricoCEM": req.body.correoConEmg,
                    "idConductorCEM": req.idConductor
                }];
                if(tablaContactoEMG){
                    const [ rows ] = await pool.query(`INSERT INTO Tbl_ContactoEmergia SET ?`, tablaContactoEMG[0]);
                    if(rows.affectedRows == 0){
                        return res.status(505).send("No se pudo registrar el contacto de emergencia");
                    }else if(rows.affectedRows == 1){
                        req.idVehiculo = rows.insertId
                        const tablaVehiculos = [{
                            "marca": req.body.marcaVehiculo,
                            "modelo": req.body.modeloVehiculo,
                            "numeroEjes": req.body.numEjes,
                            "tipoVehiculo": req.body.tipoVehiculo,
                            "traccionVeh": req.body.traccionVehiculo,
                            "placaVehiculo": req.body.placasVehiculo,
                            "placasTrailer": req.body.placasTrailer,
                            "pesoVacio": req.body.pesoVacio,
                            "CombustibleVeh": req.body.tipoCombustibleVehiculo, // documentacion vehiculo
                            "numeroLicenciaVeh": req.body.numeroLicenVehiculo,
                            "numeroSOAT": req.body.numeroSOATVehiculo,
                            "fechavencSOAT": req.body.fechaVenSOATVehiculo,
                            "nroPoliza_ResponCivil": req.body.numPolizaResCivillVehiculo,
                            "nroRev_TecMecanica": req.body.numTecnoGasVehiculo,
                            "fechaVenc_Tecno": req.body.fechaVenTecnoGasVehiculo,
                            "idConductorVeh": req.idConductor
                        }];
                        if(tablaVehiculos){
                            const [ rows ] = await pool.query(`INSERT INTO Tbl_Vehiculo SET ?`, tablaVehiculos[0]);
                            if(rows.affectedRows == 0){
                                return res.status(505).send("No se pudo registrar el vehiculo");
                            }else if (rows.affectedRows == 1){

                                let idImgFronV;
                                let urlImgFronV;

                                // Valido las img recividas y almaceno su ID y su URL
                                if(req.files){
                                    const fotoFrontal = await cloudinary.uploader.upload(req.files.frente[0].path);

                                    // URL Y ID IMAGEN FOTO FRONTAL VEHICULO
                                    idImgFronV = fotoFrontal.public_id;
                                    urlImgFronV = fotoFrontal.secure_url;

                                }else{
                                    return res.status(400).send("Problema en frente vehiculo");
                                }

                                let idImgVolcoV;
                                let urlImgVolcoV;

                                if(req.files){
                                    const fotoVolco = await cloudinary.uploader.upload(req.files.volco[0].path);

                                    // URL Y ID IMAGEN FOTO VOLCO VEHICULO
                                    idImgVolcoV = fotoVolco.public_id;
                                    urlImgVolcoV = fotoVolco.secure_url;

                                }else{
                                    return res.status(400).send("Problema en volvo vehiculo");
                                }

                                let idImgLateralIzV;
                                let urlImglateralIzV;
                                
                                if(req.files){
                                    const fotoLateralIzquierdo = await cloudinary.uploader.upload(req.files.izquierdo[0].path);

                                    // URL Y ID IMAGEN FOTO LATERAL IZQUIERDO VEHICULO
                                    idImgLateralIzV = fotoLateralIzquierdo.public_id;
                                    urlImglateralIzV = fotoLateralIzquierdo.secure_url;

                                }else{
                                    return res.status(400).send("Problema en izquierdo vehiculo");
                                }

                                let idImgLateralDeV;
                                let urlImglateralDeV;
                                
                                if(req.files){
                                    const fotoLateralDerecho = await cloudinary.uploader.upload(req.files.derecho[0].path);

                                    // URL Y ID IMAGEN FOTO LATERAL IZQUIERDO VEHICULO
                                    idImgLateralDeV = fotoLateralDerecho.public_id;
                                    urlImglateralDeV = fotoLateralDerecho.secure_url;
                                
                                }else{
                                    return res.status(400).send("Problema en derecho vehiculo");
                                }

                                let idImgLateralIzT;
                                let urlImgLateralIzT;

                                if(req.files){
                                    const fotoLateralIzquierdoTrailer = await cloudinary.uploader.upload(req.files.izquierdotrailer[0].path);

                                    // URL Y ID IMAGEN FOTO LATERAL IZQUIERDO VEHICULO
                                    idImgLateralIzT = fotoLateralIzquierdoTrailer.public_id;
                                    urlImgLateralIzT = fotoLateralIzquierdoTrailer.secure_url;
                                }else{
                                    return res.status(400).send("Problema izquierdo trailer");
                                }

                                let idImgLateralDeT;
                                let urlImgLateralDeT;
                                
                                if(req.files){
                                    const fotoLateralDerechoTrailer = await cloudinary.uploader.upload(req.files.derechotrailer[0].path);
    
                                    // URL Y ID IMAGEN FOTO LATERAL IZQUIERDO VEHICULO
                                    idImgLateralDeT = fotoLateralDerechoTrailer.public_id;
                                    urlImgLateralDeT = fotoLateralDerechoTrailer.secure_url;
    
                                }else{
                                    return res.status(400).send("Problema en derecho trailer");
                                }

                                let idImgVolvoT;
                                let urlImgVolcoT;
                                
                                if(req.files){
                                    const fotoVolcoTrailer = await cloudinary.uploader.upload(req.files.volcotrailer[0].path);
    
                                    // URL Y ID IMAGEN FOTO LATERAL IZQUIERDO VEHICULO
                                    idImgVolvoT = fotoVolcoTrailer.public_id;
                                    urlImgVolcoT = fotoVolcoTrailer.secure_url;
                                }else{
                                    return res.status(400).send("Problema en volco trailer");
                                }

                                const tablaImgVehiculos = [{
                                    "idFotoFrontal": idImgFronV,
                                    "FotoFrontal": urlImgFronV,
                        
                                    "idFotoVolco": idImgVolcoV,
                                    "FotoVolco": urlImgVolcoV,
                        
                                    "idFotolateral_Izq": idImgLateralIzV,
                                    "Fotolateral_Izq": urlImglateralIzV,
                        
                                    "idFotolateral_Der": idImgLateralDeV,
                                    "Fotolateral_Der": urlImglateralDeV,
                        
                                    // en caso de tener trailer
                                    "idFotolateral_IzqTrailer": idImgLateralIzT,
                                    "Fotolateral_IzqTrailer": urlImgLateralIzT,
                        
                                    "idFotolateral_DerTrailertext": idImgLateralDeT,
                                    "Fotolateral_DerTrailertext": urlImgLateralDeT,
                        
                                    "idFotoVolco_Trailer": idImgVolvoT,
                                    "FotoVolco_Trailer": urlImgVolcoT,

                                    "idVehiculoFotos": req.idVehiculo
                                }];

                                if(tablaImgVehiculos){
                                    const [ rows ] = await pool.query(`INSERT INTO Tbl_FotoVehiculo SET ?`, tablaImgVehiculos[0]);
                                    if(rows.affectedRows == 0){
                                        return res.status(505).send("No se pudo registrar las fotos del vehiculo");
                                    }else if(rows.affectedRows ==1){
                                        const tablaPropietarioVehiculo = [{
                                            "nombrePRO": req.body.nombresProp,
                                            "apellidoPRO": req.body.apellidoProp,
                                            "NroDocumentoPRO": req.body.numDocumentoProp,
                                            "DireccionResidenciaPRO": req.body.direccionProp,
                                            "ciudadPRO": req.body.ciudadProp,
                                            "NroTelefonoPRO": req.body.numTelefonoProp,
                                            "idVehiculoPRO": req.idVehiculo
                                        }];
                                        if(tablaPropietarioVehiculo){
                                            const [ rows ] = await pool.query(`INSERT INTO Tbl_DatosPropietario SET ?`, tablaPropietarioVehiculo[0]);
                                            if(rows.affectedRows == 0){
                                                return res.status(505).send("No se pudo registrar los datos del propietario");
                                            }else if(rows.affectedRows ==1){
                                                const tablaPoseedorVehiculo = [{
                                                    "nombreTE": req.body.nombresTE,
                                                    "apellidoTE": req.body.apellidoTE,
                                                    "NroDocumentoTE": req.body.numDocumentoTE,
                                                    "DireccionResidenciaTE": req.body.direccionTE,
                                                    "ciudadTE": req.body.ciudadTE,
                                                    "NroTelefonoTE": req.body.numTelefonoTE,
                                                    "idVehiculoTE": req.idVehiculo
                                                }];
                                                if(tablaPoseedorVehiculo){
                                                    const [ rows ] = await pool.query(`INSERT INTO Tbl_DatosTenedor SET ?`, tablaPoseedorVehiculo[0]);
                                                    if(rows.affectedRows == 0){
                                                        return res.status(505).send("No se pudo registrar los datos del tenedor o poseedor");
                                                    }else if(rows.affectedRows == 1){
                                                        res.status(200).json("Felicidades tu solictud esta en proceso de aprovacion");
                                                    }
                                                }
                                            }
                                        }
                                    
                                    }
                                }

                            }
                        }
                        
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//==========================================================
// SOLICITUDES PENDIENTES
//==========================================================

// Muestro las solicitudes de los conductores que quieren ingresar por defecto va a traer ingresoCON=0, hablitadoCon=0, estadoCON=0, disponibilidad=0 y motivo(varchar)=NULL ;

export const soliPendiente = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoRechazoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 0 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoRechazoCON IS NULL and motivoInhabilitadoCON IS NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron datos");
        }
        
    }catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

//Muestro una unica solicitud dependiendo el id del conductor

export const soliPendienteUnica = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoRechazoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 0 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoRechazoCON IS NULL AND idConductor=?`, [req.params.id]);

        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontraron datos");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

// Al presiona al boton RECHAZAR solicitud me van apedir el motivo del por que lo rechazo el conductor por defecto ya viene el null el ingresoCon asi que ese no cambia lo que diferencia a un conductor rechazo o no de TRAMO es el motivo que si no ha sido rechazado tendria el motivo en NULL entonces al rechazar una solicitud lo unico que actualizaria el el motivo que si doy rechazar tendre que dar un motivo y actualizo el NULL por lo ingresado el el modal MOTIVO ;
export const rechazarSoli = async(req, res)=>{
    try {
        const [ rows ] = await pool.query(`UPDATE Tbl_Conductores SET ? WHERE idConductor=?`, [ req.body, req.params.id])

        if(rows.affectedRows == 1){
            res.json(rows)
        }else{
            res.status(200).json("No se puedo rechazar la solicitud");
        }

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

// Al presionar al boton ACEPTAR solicitud voy a actualizar el ingresoCON=1, y el habilidadoCON=1 ;

export const aceptarSoliConductor = async(req, res)=>{
    try {
        const aceptarSoli = [{
            "IngresoCON": 1,
            "habilitadoCON": 1
        }]
        const [ rows ] = await pool.query(`UPDATE Tbl_Conductores SET ? WHERE idConductor=?`, [ aceptarSoli[0], req.params.id]);

        if(rows.affectedRows == 1){
            res.json(rows)
        }else{
            res.status(200).json("No se pudo aceptar la solicitud");
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

//==========================================================
// SOLICITUDES RECHAZADAS
//==========================================================

// Muestro las solicitudes de los conductores que quieren ingresar por defecto va a traer ingresoCON=0, hablitadoCon=0, estadoCON=0, disponibilidad=0 y motivo(varchar)= "RAZON POR LA QUE NO SE ACEPTO EN TRAMO", lleno ;

export const soliRechazada = async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoRechazoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 0 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoRechazoCON IS NOT NULL`);

        if (rows) {
            res.json(rows);
        } else {
            res.status(200).json("No se encontraron solicitudes rechazadas");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

// Solicitudes rechazadas por id unico

export const soliRechazadaUnica =  async (req, res)=>{
    try {
        const [ rows ] = await pool.query(`SELECT idVehiculo, idConductor, fotoperfilCON, placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, IngresoCON, habilitadoCON, motivoRechazoCON
        FROM Tbl_Vehiculo
        JOIN Tbl_Conductores ON Tbl_Vehiculo.idVehiculo = Tbl_Conductores.idConductor
        WHERE  IngresoCON = 0 AND habilitadoCON = 0 AND estadoCON = 0 AND disponibilidadCON = 0 AND motivoRechazoCON IS NOT NULL AND idConductor=?`, [req.params.id]);

        if (rows) {
            res.json(rows[0]);
        } else {
            res.status(200).json("No se encontraron solicitudes rechazadas");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}
