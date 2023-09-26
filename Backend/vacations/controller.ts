import { Request, Response } from "express";
import { pool } from "../database/index";

async function getAllVacations(request: Request, response: Response) {
    const followerId = request.params.followerId;
    try {
        const result = await pool.query(`
        SELECT v.VacationID, v.Destination, v.Description, v.StartDate, v.EndDate, v.Price, v.ImageFileName,
        COUNT(f.FollowedVacationID) AS FollowerCount,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM followers AS f
                WHERE f.FollowedVacationID = v.VacationID AND f.FollowerUserID = ?
            ) THEN 1
            ELSE 0
        END AS IsFollowing
 FROM vacations AS v
 LEFT JOIN followers AS f ON v.VacationID = f.FollowedVacationID
 GROUP BY v.VacationID
 ORDER BY v.StartDate ASC;

        `, [followerId])
        console.log(result);
        response.send(result[0]);
    } catch (error) {
        response.status(400).send(error)
    }
}

async function createVacation(request: Request, response: Response) {
    try {
        const {
            Destination,
            Description,
            StartDate,
            EndDate,
            Price,
            Image,
        } = request.body;
        console.log(request.body);

        const query = `
            INSERT INTO Vacations (Destination, Description, StartDate, EndDate, Price, ImageFileName)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        await pool.query(query, [
            Destination,
            Description,
            StartDate,
            EndDate,
            Price,
            Image,
        ]);
        response.status(201).send("Vacation created successfully");
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

async function deleteVacation(request: Request, response: Response) {
    try {
        const vacationID = request.params.id;
        const query = "DELETE FROM Vacations WHERE VacationID = ?";
        await pool.query(query, [vacationID]);
        response.status(204).send("vacation deleted successfully");
    } catch (error) {
        console.error("Error deleting vacation:", error);
        response.status(500).send("Internal Server Error");
    }
}

async function editVacation(request: Request, response: Response) {
    try {
        const vacationID = request.params.id;
        const {
            Destination,
            Description,
            StartDate,
            EndDate,
            Price,
            ImageFileName,
        } = request.body;
        const query = `
            UPDATE Vacations
            SET Destination = ?,
                Description = ?,
                StartDate = ?,
                EndDate = ?,
                Price = ?,
                ImageFileName = ?
            WHERE VacationID = ?
        `;
        await pool.query(query, [
            Destination,
            Description,
            StartDate,
            EndDate,
            Price,
            ImageFileName,
            vacationID,
        ]);

        response.status(204).send();
    } catch (error) {
        console.error("Error updating vacation:", error);
        response.status(500).send("Internal Server Error");
    }
}

export { getAllVacations, createVacation, deleteVacation, editVacation }