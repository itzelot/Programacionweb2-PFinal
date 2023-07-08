import { Sequelize } from "sequelize";
import db from "../config/db.js";
import { hoteles } from "../models/Hotel.js";

export const gerentes = db.define('gerentes',{
    id_grt:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:Sequelize.STRING,
    },
    ap_paterno:{
        type:Sequelize.STRING,
    },
    ap_materno:{
        type:Sequelize.STRING,
    },
    telefono:{
        type:Sequelize.STRING,
    },
    id_htl:{
        type:Sequelize.INTEGER,
        foreignKey:true,
    }
},{timestamps:false});

// hoteles.belongsTo(gerentes, {
//     foreignKey: {
//       name: "id_htl",
//     },
// });

// gerentes.hasOne(hoteles, {
//     foreignKey: {
//       name: "id_htl",
//     },
// });