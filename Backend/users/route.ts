import express from "express";
import { usersRegisteration , userLogin} from "./controller"

const usersRouter = express.Router();

usersRouter.post("/register", usersRegisteration);

usersRouter.post("/login", userLogin);


export {usersRouter}