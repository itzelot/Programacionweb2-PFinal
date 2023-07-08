import { gerentes } from "../models/Gerente.js";
import { hoteles } from "../models/Hotel.js";
import { habitaciones } from "../models/Habitacion.js";
import { MisDatos } from "../models/MisDatos.js";
import db from "../config/db.js";
import { Op } from "sequelize";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { imgHtls } from "../models/ImgHtl.js";
import { imgHabs } from "../models/ImgHab.js";
//import { imgHab } from "../models/ImgHab.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const paginaInicio = (req, res) => {
    res.render("inicio", {
        pagina: "Inicio",
    });
}

const paginaHoteles = async (req, res) => {
    //obtener registros
    const hotel = await hoteles.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo'],
    });

    res.render("hoteles", {
        pagina: "Hoteles",
        hotel: hotel,
    });
}

const paginaGerentes=async (req,res) => {
    //obtener registros
    let des = [];
    const gerente=await gerentes.findAll({
        attributes:['id_grt','ap_paterno','ap_materno','telefono','id_htl'],
        include: {
            model: hoteles,
        }
    });

    gerente.forEach(e => {
        des.push(e.id_htl);
      });
    
    const h = await hoteles.findAll({
        where: {
          id_htl: {
            [Op.notIn]: des
          },
        },
    });
    //obtener registros2
    res.render("gerentes",{
        pagina:"Gerentes",
        gerente: gerente,
        h : h,
    });
}

const paginaHabitaciones = async (req, res) => {
    //obtener registros
    const habitacion = await habitaciones.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl'],
        include: {
            model: hoteles,
        }
    });
    const hot = await hoteles.findAll();

    res.render("habitaciones", {
        pagina: "Habitaciones",
        habitacion: habitacion,
        hot: hot
    });
}

const paginaLogin = (req, res) => {
    res.render("login", {
        pagina: "Credenciales",
    });
}

const salto = (req, res) => {
    res.render("logindos", {
        pagina: "Si hay Datos",
        usuario: req.session.nombre
    });
}
const credenciales = (req, res) => {
    const {
        usuario,
        clave
    } = req.body;

    //1.- consultar la base de datos con el usuario y clave
    //2.- si no existe renderizar de nuevo login
    //3.- si existe, el usuario y rol, opcional permisos
    //4.- guardar en variable de sesion
    //5.- mandarlo a inicio
}

const cerrarSesion = (req, res) => {
    req.session.destroy()
    res.render("login", {
        pagina: "Credenciales",
    });
}

const paginaImagenesHtl = async (req, res) => {
    const imgHtl = await imgHtls.findAll({
        attributes: ['id_imgHtl', 'nombre', 'id_htl'],
        include: {
            model: hoteles,
        }
    });
    const hot = await hoteles.findAll();
    res.render("imagenHtl", {
        pagina: "imagenHtl",
        imgHtl: imgHtl,
        hot: hot
    });
}

const paginaImagenesHabs = async (req, res) => {
    const imgHabt = await imgHabs.findAll({
        attributes: ['id_imgHab', 'nombre', 'id_hbt'],
        include: {
            model: habitaciones,
        }
    });
    const hab = await habitaciones.findAll();
    res.render("imagenHbt", {
        pagina: "imagenHbt",
        imgHabt: imgHabt,
        hab: hab
    });
}

const uploadHtl = async (req, res) => {
    console.log("se ejecuta")
    const files = req.files
    //const {id_imgHtl, nombre, id_htl} = req.body;
    const imgHt = await imgHtls.findAll({
        attributes: ['id_imgHtl', 'nombre', 'id_htl'],
        include: {
            model: hoteles,
        }
    });

    console.log(files)
    Object.keys(files).forEach(key => {
        const filepath = path.join(path.resolve(), 'public/img/Hoteles', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
        Object.keys(files).forEach(async (key) => {
            const filepath = path.join(path.resolve(), 'public/img/Hoteles', files[key].name)
            let nombre = files[key].name
            let id_htl = imgHt.id_htl;
            await imgHtls.create({
                nombre,
                id_htl
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString() })
    })
}

const uploadHbt = async (req, res) => {
    console.log("se ejecuta")
    const files = req.files
    //const {id_imgHtl, nombre, id_htl} = req.body;
    const imgHabt = await imgHabs.findAll({
        attributes: ['id_imgHab', 'nombre', 'id_hbt'],
        include: {
            model: habitaciones,
        }
    });

    console.log(files)
    Object.keys(files).forEach(key => {
        const filepath = path.join(path.resolve(), 'public/img/Habitaciones', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
        Object.keys(files).forEach(async (key) => {
            const filepath = path.join(path.resolve(), 'public/img/Habitaciones', files[key].name)
            let nombre = files[key].name;
            let id_hbt = imgHabt.id_hbt;
            await imgHabs.create({
                nombre,
                id_hbt
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString() })
    })
}

export {
    paginaLogin,
    paginaInicio,
    paginaHoteles,
    paginaGerentes,
    paginaHabitaciones,
    cerrarSesion,
    credenciales,
    salto,
    uploadHbt,
    uploadHtl,
    paginaImagenesHtl,
    paginaImagenesHabs
}