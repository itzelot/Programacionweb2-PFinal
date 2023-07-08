import express from 'express';
import db from "./config/db.js";
import rutas from "./rutas/index.js";

const app = express();

//conexión de base de datos
db.authenticate()
    .then(()=>console.log("Conexión exitosa"))
    .catch(error=>console.log(error));

//definiendo el puerto
const port = process.env.PORT ||1930;

//definiendo pug para plantillas
app.set("view engine","pug");

//midleware
app.use((req, res, next) => {
    const ano = new Date();
    res.locals.tiempo = " " + ano.getFullYear();
    return next();
});

//Agregar parser body para obtener los datos de un formulario
app.use(express.urlencoded({ extended: true}));

//definiendo carpeta pública 
app.use(express.static("public"));

//definiendo rutas
app.use("/",rutas);

app.listen(port,()=>{
    console.log(`Servidor iniciando en el puerto ` + port);
});