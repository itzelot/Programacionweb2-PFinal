import express from "express";
import { paginaInicio, paginaHoteles, paginaHabitaciones} from "..//controller/paginasController.js";

const rutas = express.Router();

rutas.get("/", paginaInicio);
rutas.get("/hoteles",paginaHoteles);
rutas.get("/habitaciones",paginaHabitaciones);

export default rutas;