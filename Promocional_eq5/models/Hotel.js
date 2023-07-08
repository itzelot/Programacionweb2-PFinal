import { Sequelize } from "sequelize";
import db from "../config/db.js";
import { habitaciones } from "../models/Habitacion.js";

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

hoteles.hasMany (habitaciones,{
    foreignKey:'id_htl'
});
  
habitaciones.belongsTo(hoteles, {
    foreignKey: {
      name: "id_htl",
    },
});