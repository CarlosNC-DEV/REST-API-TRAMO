import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from 'path';

import loginAdmin from "./routes/loginAdmin.routes.js";
import conductores from "./routes/conductores.routes.js";
import solicitudes from "./routes/solicitudes.routes.js";
import datosConductores from "./routes/datosConductores.routes.js";
import datosClienteNatural from "./routes/datosClientesNatural.routes.js";
import datosClienteEmpresa from "./routes/datosClienteEmpresa.routes.js";

const app = express();

app.use(morgan("dev"));

// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Además le decimos a express que vamos a usar json

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', (__dirname + '/views'));

//Establecemos el motor de plantillas
app.set('view engine','ejs');

// Cuando reciba un fie lo guadare en la carpeta upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// Configurar los headers de CORS
app.use(cors());

app.use(loginAdmin);
app.use("/admin", conductores);
app.use("/admin", solicitudes);
app.use("/admin", datosConductores);
app.use("/admin", datosClienteNatural);
app.use("/admin", datosClienteEmpresa);

export default app;
