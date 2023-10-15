import express from "express";
import {addingFollowers, removeFollower} from "./controller";

const followersRouter = express.Router();

followersRouter.post("/adding", addingFollowers);

followersRouter.delete("/removeFollower", removeFollower);

export {followersRouter}