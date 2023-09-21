import express from "express";
import {addingFollowers} from "./controller";

const followersRouter = express.Router();

followersRouter.post("/adding", addingFollowers);

export {followersRouter}