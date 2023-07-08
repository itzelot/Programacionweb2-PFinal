import { hoteles } from "../models/Hotel.js";
import { habitaciones } from "../models/Habitacion.js";

const paginaInicio= (req,res) => {
    res.render("inicio",{
        pagina: "Inicio",
    });
}

const paginaHoteles=async (req, res) =>{
    //obtener registros
    const hotel3=await hoteles.findAll({
        attributes: ['id_htl','nombre','direccion','telefono','correo'],
    });

    res.render("hoteles",{
        pagina:"Hoteles",
        hotel3:hotel3
    })
};

const paginaHabitaciones=async (req,res) => {
    //obtener registros
    const htl2 = await hoteles.findByPk(req.query.id);   
    const habitacion=await habitaciones.findAll({
        attributes: ['id_hbt','piso','nombre','refrigerador','id_htl'],
        include:{
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
    
    res.render("habitaciones",{
        pagina:"habitaciones",
        habitacion: habitacion,
        htl2: htl2,
        hot: hot
    })
}

export{
    paginaInicio,
    paginaHoteles,
    paginaHabitaciones,
}