import express from "express";
import { eliminarGerentes, eliminarHabitaciones, eliminarHoteles, guardarGerentes, guardarHabitaciones, guardarHoteles, 
    
    listaGerentes, listaHab, listaHoteles, modificarGerentes, modificarHabitaciones, modificarHoteles } from "../controller/hotelesController.js";
import { paginaInicio, paginaGerentes, paginaHabitaciones, paginaHoteles, paginaLogin, cerrarSesion,credenciales,salto, uploadHtl,
    paginaImagenesHtl,
    uploadHbt,
    paginaImagenesHabs} from "../controller/paginasController.js";
import fileUpload from 'express-fileupload';
import {fileExtLimiter} from "../middleware/fileExtLimiter.js";
import {fileSizeLimiter} from "../middleware/fileSizeLimiter.js";
import {filesPayloadExists} from "../middleware/filesPayloadExists.js";
import {dirname}  from 'path';
import path from "path";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url)
const _dirname = dirname(__filename)


const rutas = express()

const auth = function(req, res, next) {
    const errores = [];
        if (req.session && req.session.user === "demo" && req.session.admin)
            return next();
        else
            return res.redirect("/listaHoteles");
};

const auth2 = function(req, res, next) {
    const errores = [];
        if (req.session && req.session.user === "demo" && req.session.admin)
            return next();
        else
            return res.redirect("/listaGerentes");
};

const auth3 = function(req, res, next) {
    const errores = [];
        if (req.session && req.session.user === "demo" && req.session.admin)
            return next();
        else
            return res.redirect("/listaHoteles");
};

rutas.get("/", paginaInicio);
// rutas.get("/hoteles", auth, function (req, res) {
//     res.send("You can only see this after you've logged in.");
// });
rutas.get("/hoteles",paginaHoteles);
rutas.get("/gerentes",paginaGerentes);
rutas.get("/habitaciones",paginaHabitaciones);


rutas.post("/hoteles",guardarHoteles);
rutas.get("/listaHoteles",listaHoteles);
rutas.get("/modificarHoteles",modificarHoteles);
rutas.get("/eliminarHoteles", auth, eliminarHoteles);

rutas.post("/gerentes",guardarGerentes);
rutas.get("/listaGerentes",listaGerentes);
rutas.get("/modificarGerentes",modificarGerentes);
rutas.get("/eliminarGerentes", auth2, eliminarGerentes);

rutas.post("/habitaciones",guardarHabitaciones);
rutas.get("/listaHab",listaHab);
rutas.get("/modificarHabitaciones",modificarHabitaciones);
rutas.get("/eliminarHabitaciones", auth3, eliminarHabitaciones);

rutas.post('/uploadHtl',fileUpload({createParentPath:true}),
filesPayloadExists,fileExtLimiter(['.png','.jpg','jpeg']),
fileSizeLimiter,uploadHtl);

rutas.get('/imgHtl', paginaImagenesHtl);

rutas.post('/uploadHbt',fileUpload({createParentPath:true}),
filesPayloadExists,fileExtLimiter(['.png','.jpg','jpeg']),
fileSizeLimiter,uploadHbt);

rutas.get('/imgHbt', paginaImagenesHabs);

rutas.get("/", paginaLogin);

rutas.post("/credenciales",credenciales);

rutas.get("/cerrarSesion", cerrarSesion);

rutas.get("/salto",salto);



export default rutas;