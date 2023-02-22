import app from './src/app.js';
import { PORT } from './src/config.js';

app.use((req, res, next) => {
    return res.json('Bienvenido a TRAMO')
});

app.listen(PORT, (req, res)=>{
    console.log(`servidor escuchanod en puerto ${PORT}`)
});