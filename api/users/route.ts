import express from "express";
import { usersRegisteration } from "./controller"

const usersRouter = express.Router();

usersRouter.post("/register", usersRegisteration);


export {usersRouter}