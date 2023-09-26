import { Request, Response } from "express";
import { pool } from "../database/index";

async function usersRegisteration(request: Request, response: Response) {
    try {
        const usersRegisteration = request.body;
        console.log(usersRegisteration);
        const checkingEmailQuery = 'select count(*) as number from users where email = ?'
        const checkingEmail: any = await pool.execute(checkingEmailQuery, [usersRegisteration.Email])
        console.log(checkingEmail);
        console.log(checkingEmail[0][0].number);
        let verifyEmail = checkingEmail[0][0].number;
        if (verifyEmail <= 0) {
            const query = 'INSERT INTO Users (FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, ?)';
            const result = await pool.execute(query, [usersRegisteration.FirstName, usersRegisteration.LastName, usersRegisteration.Email, usersRegisteration.Password, 'User']);
            const [data] = result;
            response.send(data);
        }
        else {
            response.send("Email is taken")
        }
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

async function userLogin(request: Request, response: Response) {
    try {
        const loginUser = request.body;
        console.log(loginUser);
        const emailCheckQuery = 'select * from users where email = ? and password = ?'
        const checkingEmail: any = await pool.execute(emailCheckQuery, [loginUser.Email, loginUser.Password])
        console.log(checkingEmail[0]);
        if (checkingEmail[0].length === 0) {
            response.send("Email or Password is not available")
        } else {
            response.send(checkingEmail[0][0])
        }
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

export { usersRegisteration, userLogin }