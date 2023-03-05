import express from "express";
import morgan from "morgan";
import cors from "cors";

import loginAdmin from "./routes/loginAdmin.routes.js";
import conductores from "./routes/conductores.routes.js";
import solicitudes from "./routes/solicitudes.routes.js";
import datosConductores from "./routes/datosConductores.routes.js";
import datosClienteNatural from "./routes/datosClientesNatural.routes.js";
import datosClienteEmpresa from "./routes/datosClienteEmpresa.routes.js";

const app = express();

// Configurar los headers de CORS
app.use(cors());
app.use(morgan("dev"));

// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Además le decimos a express que vamos a usar json

app.use(loginAdmin);
app.use("/admin", conductores);
app.use("/admin", solicitudes);
app.use("/admin", datosConductores);
app.use("/admin", datosClienteNatural);
app.use("/admin", datosClienteEmpresa);

export default app;
