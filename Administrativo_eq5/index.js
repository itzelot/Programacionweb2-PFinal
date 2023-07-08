import express from 'express';
import rutas from './rutas/index.js';
import db from "./config/db.js";
import session from "express-session";
import {nanoid} from "nanoid";

const app = express();

//conexión de base de datos
db.authenticate()
    .then(()=>console.log("Conexión exitosa"))
    .catch(error=>console.log(error));

//definiendo el puerto
const port = process.env.PORT ||1900;

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

//definiendo la sesion
app.use(session({
    secret:nanoid(),
    resave:true,
    saveUninitialized:true
}));

//midleware
app.use((req, res, next) => {
    const ano = new Date();
    res.locals.tiempo = " " + ano.getFullYear();
    console.log(req.url);
    
    try{
        if(req.url==="/credenciales"){
            const {
                usuario,
                clave
            } = req.body;
            console.log(usuario+ " "+clave );
            
            if(usuario==="demo" && clave==="123"){
                console.log("Entrada 1")        
                req.session.nombre="FES";
                req.session.rol="adm";
                req.session.user = "demo";
                req.session.admin = true;
                console.log(req.session.nombre + " "+req.session.rol)
                res.render("inicio",{
                    pagina:"datos",
                    usuario:req.session.nombre           
                })            
            }else if(usuario==="empleado" && clave==="456"){
                console.log("Entrada 2")        
                req.session.nombre="FES2";
                req.session.rol="empleado";
                console.log(req.session.nombre + " "+req.session.rol)
                res.render("inicio",{
                    pagina:"datos",
                    usuario:req.session.nombre           
                })
            }
            else{
                res.render("login",{
                    pagina:"Credenciales"           
                });    
            }  
        }else{
            if(req.session.rol===undefined){
                console.log("no existe......1 "+req.session.rol);
                res.render("login",{
                    pagina:"Credenciales"           
                });   
            }else{
                console.log("si existe......2 "+req.session.rol);
             
                return next();
            }           
        }       
    }catch(e){
        console.log("no existe......")
        res.render("login",{
            pagina:"Credenciales"           
        });
    }
});

//definiendo rutas
app.use("/",rutas);

app.listen(port,()=>{
    console.log(`Servidor iniciando en el puerto ` + port);
});