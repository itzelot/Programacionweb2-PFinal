import { Sequelize } from "sequelize";
import db from "../config/db.js";
import { habitaciones } from "../models/Habitacion.js";
import { gerentes } from "../models/Gerente.js";
import { imgHtls } from "./ImgHtl.js";

export const hoteles = db.define('hoteles',{
    id_htl:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:Sequelize.STRING,
    },
    direccion:{
        type:Sequelize.STRING,
    },
    telefono:{
        type:Sequelize.STRING,
    },
    correo:{
        type:Sequelize.STRING,
    }
},{timestamps:false});

gerentes.belongsTo(hoteles, {
    foreignKey: {
      name: "id_htl",
    },
});

hoteles.hasOne(gerentes, {
    foreignKey: {
      name: "id_htl",
    },
});

hoteles.hasMany (habitaciones,{
    foreignKey:'id_htl'
});
  
habitaciones.belongsTo(hoteles, {
    foreignKey: {
      name: "id_htl",
    },
});

hoteles.hasMany (imgHtls,{
    foreignKey:'id_htl'
});

imgHtls.belongsTo(hoteles,{
    foreignKey: {
        name: "id_htl",
      },
})
