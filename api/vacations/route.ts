import express from "express";
import { getAllVacations } from "./controller"

const vacationsRouter = express.Router();

vacationsRouter.get("/", getAllVacations);

export {vacationsRouter}