import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const imgHabs = db.define('imgHabs',{
    id_imgHab:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:Sequelize.STRING,
    },
    id_hbt:{
        type:Sequelize.INTEGER,
    }
},{timestamps:false});



