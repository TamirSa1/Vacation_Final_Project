import { Request, Response } from "express";
import { pool } from "../database/index";

async function addingFollowers(request: Request, response: Response) {
  try {
    const newFollower = request.body;
    console.log(newFollower);
    const query = 'INSERT INTO Followers (FollowerUserID, FollowedVacationID) VALUES ($1, $2)';
    const result = await pool.query(query, [newFollower.FollowerUserID, newFollower.FollowedVacationID]);
    const [data] = result;
    response.send(data);
  } catch (error) {
    console.log(error);
    response.status(400).send(error)
  }
}

async function removeFollower(request: Request, response: Response) {
  try {
    const followerUserID = request.query.FollowerUserID;
    const followedVacationID = request.query.FollowedVacationID;
    const query = `DELETE FROM Followers WHERE followerUserID = $1 and followedVacationID = $2`
    await pool.query(query, [followerUserID, followedVacationID]);
    response.status(204).send("follower vacation deleted successfully");
  } catch (error) {
    console.error("Error deleting vacation:", error);
    response.status(500).send("Internal Server Error");
  }
}

export { addingFollowers, removeFollower }