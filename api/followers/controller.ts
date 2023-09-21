import { Request, Response } from "express";
import { pool } from "../database/index";

async function addingFollowers(request: Request, response: Response){
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

export {addingFollowers}