import { hoteles } from '../models/Hotel.js';
import { gerentes } from '../models/Gerente.js';
import { habitaciones } from '../models/Habitacion.js';
import db from '../config/db.js';
import { existsSync } from 'fs';
import { imgHtls } from '../models/ImgHtl.js';


const guardarHoteles = async (req, res) => {
    let h;
    const { id_htl, nombre, direccion, telefono, correo } = req.body;
    const hotel = await hoteles.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo'],
    })
    const errores = [];
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio" });
    }
    if (nombre.length > 70) {
        errores.push({ mensaje: "El nombre es muy largo" });
    }
    if (direccion.trim() === "") {
        errores.push({ mensaje: "La direccion no debe ser vacio" });
    }
    if (direccion.length > 200) {
        errores.push({ mensaje: "La direccion es muy larga" });
    }
    if (telefono.trim() === "") {
        errores.push({ mensaje: "El telefono no debe ser vacio" });
    }
    if (telefono.length != 10) {
        errores.push({ mensaje: "El telefono debe tener 10 digitos" });
    }
    if (correo.trim() === "") {
        errores.push({ mensaje: "El correo no debe ser vacio" });
    }
    if (correo.length < 6) {
        errores.push({ mensaje: "Correo invalido" });
    }
    if (errores.length > 0) {

        res.render("hoteles", {
            pagina: "Hoteles",
            errores,
            id_htl,
            nombre,
            direccion,
            telefono,
            correo,
        });
    } else {
        console.log(id_htl);
        if (id_htl > 0) {
            //Actualizar
            console.log('actualiza');
            try {
                await hoteles.update({
                    id_htl,
                    nombre,
                    direccion,
                    telefono,
                    correo,
                }, { where: { id_htl: id_htl } });
                res.redirect('/listaHoteles')
            } catch (error) {
                console.log(error)
            }
        } else {
            //Almacenar en la base de datos
            try {
                await hoteles.create({
                    nombre,
                    direccion,
                    telefono,
                    correo,
                });

                res.redirect('/listaHoteles')
            } catch (error) {
                console.log(error)
            }
        }
    }
};

const listaHoteles = async (req, res) => {
    //obtener registros
    const hotel3 = await hoteles.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo'],
    });

    res.render("listaHoteles", {
        pagina: "Hoteles",
        hotel3: hotel3
    })
};

const modificarHoteles = async (req, res) => {
    //obtener registros
    const hotel = await hoteles.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo']
    });
    console.log('Listo ' + req.query.id)
    try {
        const htl = await hoteles.findByPk(req.query.id);
        console.log(htl);
        const errores = [];
        res.render("hoteles", {
            pagina: "Hoteles",
            errores,
            id_htl: htl.id_htl,
            nombre: htl.nombre,
            direccion: htl.direccion,
            telefono: htl.telefono,
            correo: htl.correo,
        });
    } catch (error) {
        console.log(error);
    }
};

const eliminarHoteles = async (req, res) => {
    const hotel = await hoteles.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo']
    });
    try {
        await hoteles.destroy({
            where: { id_htl: req.query.id }
        });
    } catch (error) {
        console.log(error);
    };
    res.redirect('/listaHoteles')
    const id_htl = req.query.id;
    console.log('Listo borrar ' + id_htl)
};

//#########################################################
const guardarGerentes = async (req, res) => {
    let des = [];
    const { id_grt, nombre, ap_paterno, ap_materno, telefono, id_htl } = req.body;
    const gerente = await gerentes.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono', 'id_htl'],
        include: {
            model: hoteles,
            required: true
        }
    })

    const h = await hoteles.findAll()
    const errores = [];
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio" });
    }
    if (nombre.length > 30) {
        errores.push({ mensaje: "El nombre es muy largo" });
    }
    if (ap_paterno.trim() === "") {
        errores.push({ mensaje: "El apellido paterno no debe ser vacio" });
    }
    if (ap_paterno.length > 15) {
        errores.push({ mensaje: "El apellido paterno es muy largo" });
    }
    if (ap_materno.trim() === "") {
        errores.push({ mensaje: "El apellido materno no debe ser vacio" });
    }
    if (ap_materno.length > 15) {
        errores.push({ mensaje: "El apellido materno es muy largo" });
    }
    if (telefono.trim() === "") {
        errores.push({ mensaje: "El telefono no debe ser vacio" });
    }
    if (telefono.length != 10) {
        errores.push({ mensaje: "El telefono debe tener 10 digitos" });
    }
    if (id_htl === gerente.id_htl) {
        errores.push({ mensaje: "El hotel ya tiene gerente" })
    }

    if (errores.length > 0) {
        res.render("gerentes", {
            pagina: "Gerentes",
            errores,
            id_grt,
            nombre,
            ap_paterno,
            ap_materno,
            telefono,
            id_htl,
            h: h
        });
    } else {
        console.log(id_grt);
        if (id_grt > 0) {
            //Actualizar
            console.log('actualiza');
            try {
                await gerentes.update({
                    id_grt,
                    nombre,
                    ap_paterno,
                    ap_materno,
                    telefono,
                    id_htl
                }, { where: { id_grt: id_grt } });
                res.redirect('/listaGerentes')
            } catch (error) {
                console.log(error)
            }
        } else {
            //Almacenar en la base de datos
            try {
                await gerentes.create({
                    nombre,
                    ap_paterno,
                    ap_materno,
                    telefono,
                    id_htl
                });
                res.redirect('/listaGerentes')
            } catch (error) {
                console.log(error)
            }
        }
    }
}

const listaGerentes = async (req, res) => {
    //obtener registros
    const h = await hoteles.findAll();
    const gerente = await gerentes.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono', 'id_htl'],
        include: {
            model: hoteles,
            required: true,
        }
    });

    const datos = await gerentes.findAll({ //??????
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono', 'id_htl'],
        include: {
            model: hoteles,
            required: true,
        }
    });

    res.render("listaGerentes", {
        pagina: "Gerentes",
        gerente: gerente
    })
};

const modificarGerentes = async (req, res) => {
    //obtener registros
    const { id_grt, nombre, ap_paterno, ap_materno, telefono, id_htl } = req.body;
    const gerente = await gerentes.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono', 'id_htl'],
        include: {
            model: hoteles,
            required: true,
        }
    });
    const h = await hoteles.findAll();
    console.log('Listo ' + req.query.id)
    const errores = [];
    try {
        const grt = await gerentes.findByPk(req.query.id);
        const h = await hoteles.findAll();
        console.log(grt);
        res.render("gerentes", {
            pagina: "Gerentes",
            errores,
            id_grt: grt.id_grt,
            nombre: grt.nombre,
            ap_paterno: grt.ap_paterno,
            ap_materno: grt.ap_materno,
            telefono: grt.telefono,
            id_htl: grt.id_htl,
            h: h,

        });
    } catch (error) {
        console.log(error);
    }
};

const eliminarGerentes = async (req, res) => {
    const gerente = await gerentes.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono', 'id_htl']
    });
    try {
        await gerentes.destroy({
            where: { id_grt: req.query.id }
        });
    } catch (error) {
        console.log(error);
    };
    res.redirect('/listaGerentes');
    const id_grt = req.query.id;
    console.log('Listo borrar ' + id_grt)
};

//#########################################################
const guardarHabitaciones = async (req, res) => {
    const { id_hbt, piso, nombre, refrigerador, id_htl } = req.body;
    const hot = await hoteles.findAll();
    const htl2 = await hoteles.findByPk(req.query.id);
    const errores = [];
    if (piso.trim() === "") {
        errores.push({ mensaje: "El piso no debe ser vacio" });
    }
    if (piso.length > 2) {
        errores.push({ mensaje: "El piso puede contener max 2 caracteres" });
    }
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio" });
    }
    if (nombre.length > 30) {
        errores.push({ mensaje: "El nombre es muy largo" });
    }
    if (id_htl.trim() === "") {
        errores.push({ mensaje: "El id_htl no debe ser vacio" });
    }
    if (errores.length > 0) {
        res.render("habitaciones", {
            pagina: "Habitaciones",
            errores,
            id_hbt,
            piso,
            nombre,
            refrigerador,
            id_htl,
            hot: hot,
            htl2: htl2
        });
    } else {
        console.log(id_hbt);
        if (id_hbt > 0) {
            //Actualizar
            console.log('actualiza');
            try {
                await habitaciones.update({
                    id_hbt,
                    piso,
                    nombre,
                    refrigerador,
                    id_htl
                }, { where: { id_hbt: id_hbt } });
                res.redirect('/listaHoteles')
            } catch (error) {
                console.log(error)
            }
        } else {
            //Almacenar en la base de datos
            try {
                await habitaciones.create({
                    piso,
                    nombre,
                    refrigerador,
                    id_htl
                });
                res.redirect('/listaHoteles')
            } catch (error) {
                console.log(error)
            }
        }
    }
};

const listaHab = async (req, res) => {
    //obtener registros
    const htl2 = await hoteles.findByPk(req.query.id);
    const habitacion = await habitaciones.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl'],
        include: {
            model: hoteles,
            required: true,
        },
        where: {
            id_htl: htl2.id_htl
        }

    });
    const hot = await hoteles.findAll({
        where: {
            id_htl: htl2.id_htl
        }
    }
    );

    res.render("hab", {
        pagina: "hab",
        habitacion: habitacion,
        htl2: htl2,
        hot: hot,

    })
};

const modificarHabitaciones = async (req, res) => {
    //obtener registros
    const habitacion = await habitaciones.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl']
    });
    console.log('Listo ' + req.query.id)
    try {
        const hbt = await habitaciones.findByPk(req.query.id)
        const htl2 = await hoteles.findByPk(req.query.id);
        const hot = await hoteles.findAll();
        console.log(hbt);
        const errores = [];
        res.render("habitaciones", {
            pagina: "Habitaciones",
            errores,
            id_hbt: hbt.id_hbt,
            piso: hbt.piso,
            nombre: hbt.nombre,
            refrigerador: hbt.refrigerador,
            id_htl: hot.id_htl,
            hot: hot,
            htl2: htl2
        });
    } catch (error) {
        console.log(error);
    }
};

const eliminarHabitaciones = async (req, res) => {
    const htl2 = await hoteles.findByPk(req.query.id);
    const habitacion = await habitaciones.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl']
    });
    try {
        await habitaciones.destroy({
            where: { id_hbt: req.query.id }
        });
    } catch (error) {
        console.log(error);
    };
    res.redirect('/listaHoteles')
    const id_hbt = req.query.id;
    console.log('Listo borrar ' + id_hbt)
};



export {
    guardarHoteles, listaHoteles, modificarHoteles, eliminarHoteles, guardarGerentes, listaGerentes, modificarGerentes, eliminarGerentes,
    guardarHabitaciones, modificarHabitaciones, eliminarHabitaciones, listaHab
};