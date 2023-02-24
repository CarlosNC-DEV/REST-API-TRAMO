import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import fileUpload from "express-fileupload";
import cookieParser from 'cookie-parser';

import loginAdmin from "./routes/loginAdmin.routes.js";
import conductores from "./routes/conductores.routes.js";
import solicitudes from "./routes/solicitudes.routes.js";
import datosConductores from './routes/datosConductores.routes.js';
import datosClienteNatural from './routes/datosClientesNatural.routes.js';
import datosClienteEmpresa from './routes/datosClienteEmpresa.routes.js';

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Además le decimos a express que vamos a usar json

// Cuando reciba un fie lo guadare en la carpeta upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // solo para HTTPS
      sameSite: "none", // solo para HTTPS
      maxAge: 1000 * 60 * 60 * 24, // duración de la sesión en milisegundos (1 día)
    },
  })
);

app.use(loginAdmin);
app.use("/admin", conductores);
app.use("/admin", solicitudes);
app.use("/admin", datosConductores);
app.use("/admin", datosClienteNatural);
app.use("/admin", datosClienteEmpresa);

export default app;
