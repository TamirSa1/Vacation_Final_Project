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

export { getAllVacations }