import { Request, Response } from "express";
import { pool } from "../database/index";

async function getAllVacations(request: Request, response: Response) {
    const followerId = request.params.followerId;

    try {
        // pool.connect()
        const result = await pool.query(`
        SELECT v.VacationID, v.Destination, v.Description, v.StartDate, v.EndDate, v.Price, v.ImageFileName,
        COUNT(f.FollowedVacationID) AS FollowerCount,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM followers AS f
                WHERE f.FollowedVacationID = v.VacationID AND f.FollowerUserID = $1
            ) THEN 1
            ELSE 0
        END AS IsFollowing
        FROM vacations AS v
        LEFT JOIN followers AS f ON v.VacationID = f.FollowedVacationID
        GROUP BY v.VacationID
        ORDER BY v.StartDate ASC;
        `, [followerId])
        response.send(result.rows);
    } catch (error) {
        response.status(400).send(error)
    }
}

async function createVacation(request: Request, response: Response) {
    try {
        const {
            destination,
            description,
            startdate,
            enddate,
            price,
            imagefilename,
        } = request.body;
        console.log(request.body);

        const query = `
            INSERT INTO Vacations (Destination, Description, StartDate, EndDate, Price, ImageFileName)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning vacationid;
        `;
        let result = await pool.query(query, [
            destination,
            description,
            startdate,
            enddate,
            price,
            imagefilename,
        ]);
        response.status(201).send(result.rows[0]);
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

async function deleteVacation(request: Request, response: Response) {
    try {
        const vacationID = request.params.id;
        const query = "DELETE FROM Vacations WHERE VacationID = $1";
        await pool.query(query, [vacationID]);
        response.status(204).send("vacation deleted successfully");
    } catch (error) {
        console.error("Error deleting vacation:", error);
        response.status(500).send("Internal Server Error");
    }
}

async function editVacation(request: Request, response: Response) {
    try {
        const vacationid = request.params.id;
        const {
            destination,
            description,
            startdate,
            enddate,
            price,
            imagefilename,
        } = request.body;
        const query = `
            UPDATE Vacations
            SET Destination = $1,
                Description = $2,
                StartDate = $3,
                EndDate = $4,
                Price = $5,
                ImageFileName = $6
            WHERE VacationID = $7
        `;
        await pool.query(query, [            
            destination,
            description,
            startdate,
            enddate,
            price,
            imagefilename,
            vacationid,
        ]);

        response.status(204).send();
    } catch (error) {
        console.error("Error updating vacation:", error);
        response.status(500).send("Internal Server Error");
    }
}

export { getAllVacations, createVacation, deleteVacation, editVacation }