import express from "express";
import { getAllVacations , createVacation, deleteVacation, editVacation} from "./controller"

const vacationsRouter = express.Router();

vacationsRouter.get("/", getAllVacations);

vacationsRouter.post("/addVacation", createVacation);

vacationsRouter.delete("/deleteVacation/:id", deleteVacation);

vacationsRouter.put("/editVacation/:id", editVacation);


export {vacationsRouter}