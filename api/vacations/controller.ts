import { Request, Response } from "express";
import { pool } from "../database/index";

async function getAllVacations(request: Request, response: Response) {
    try {
        const result = await pool.query(`SELECT * FROM Vacations ORDER BY StartDate ASC;`)
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

export { getAllVacations , createVacation, deleteVacation, editVacation}