import { Request, Response } from "express";
import { pool } from "../database/index";
import bcrypt from "bcrypt";

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
            const saltRounds = 10;
            bcrypt.hash(usersRegisteration.Password, saltRounds, async function (err: any, hash: any) {
                const query = 'INSERT INTO Users (FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, ?)';
                const result = await pool.execute(query, [usersRegisteration.FirstName, usersRegisteration.LastName, usersRegisteration.Email, hash, 'User']);
                const [data] = result;
                response.send(data);
            });
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
        const emailCheckQuery = 'select * from users where email = ?'
        const checkingEmail: any = await pool.execute(emailCheckQuery, [loginUser.Email])
        console.log(checkingEmail[0]);
        if (checkingEmail[0].length === 0) {
            response.send("Email is not available")
        } else {
            bcrypt.compare(loginUser.Password, checkingEmail[0][0].Password, function (err, result) {
                if (result == true) {
                    response.send(checkingEmail[0][0])
                } else {
                    response.send("Password is incorrect")
                }
            });
        }
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

export { usersRegisteration, userLogin }