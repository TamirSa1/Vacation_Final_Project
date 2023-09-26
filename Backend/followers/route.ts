import express from "express";
import {addingFollowers, checkIfUserIsFollowing, removeFollower} from "./controller";

const followersRouter = express.Router();

followersRouter.post("/adding", addingFollowers);

followersRouter.get("/check", checkIfUserIsFollowing);

followersRouter.delete("/removeFollower", removeFollower);

export {followersRouter}