import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const habitaciones = db.define('habitaciones',{
    id_hbt:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    piso:{
        type:Sequelize.INTEGER,
    },
    nombre:{
        type:Sequelize.STRING,
    },
    refrigerador:{
        type:Sequelize.BOOLEAN,
    },
    id_htl:{
        type:Sequelize.INTEGER,
        foreignKey:true,
    },
},{timestamps:false});