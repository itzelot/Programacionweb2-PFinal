import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const imgHtls = db.define('imgHtls',{
    id_imgHtl:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:Sequelize.STRING,
    },
    id_htl:{
        type:Sequelize.INTEGER,
    }
},{timestamps:false});


