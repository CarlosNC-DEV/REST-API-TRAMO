import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import fileUpload from "express-fileupload";

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

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // configurar en true si utiliza HTTPS
    httpOnly: true, // la cookie no es accesible por el navegador
    maxAge: 3600000 // tiempo de expiración en milisegundos
  }
}));

app.use(loginAdmin);
app.use("/admin", conductores);
app.use("/admin", solicitudes);
app.use("/admin", datosConductores);
app.use("/admin", datosClienteNatural);
app.use("/admin", datosClienteEmpresa);

export default app;
