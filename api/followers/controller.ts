import { Request, Response } from "express";
import { pool } from "../database/index";

async function addingFollowers(request: Request, response: Response) {
  try {
    const newFollower = request.body;
    console.log(newFollower);
    const query = 'INSERT INTO Followers (FollowerUserID, FollowedVacationID) VALUES (?, ?)';
    const result = await pool.execute(query, [newFollower.FollowerUserID, newFollower.FollowedVacationID]);
    const [data] = result;
    response.send(data);
  } catch (error) {
    console.log(error);
    response.status(400).send(error)
  }
}

async function checkIfUserIsFollowing(request: Request, response: Response) {
  try {
    const followerUserID = request.query.FollowerUserID;
    const followedVacationID = request.query.FollowedVacationID;

    const query = `
        SELECT * FROM Followers
        WHERE FollowerUserID = ? AND FollowedVacationID = ?
      `;

    const result: any[] = await pool.query(query, [followerUserID, followedVacationID]);
    if (result[0].length > 0) {
      response.json({ isFollowing: true });
    } else {
      response.json({ isFollowing: false });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

async function removeFollower(request: Request, response: Response) {
  try {
    const followerUserID = request.query.FollowerUserID;
    const followedVacationID = request.query.FollowedVacationID;
    const query = `DELETE FROM Followers WHERE followerUserID = ? and followedVacationID = ?`
    await pool.query(query, [followerUserID, followedVacationID]);
    response.status(204).send("follower vacation deleted successfully");
  } catch (error) {
    console.error("Error deleting vacation:", error);
    response.status(500).send("Internal Server Error");
  }
}

export { addingFollowers, checkIfUserIsFollowing, removeFollower }