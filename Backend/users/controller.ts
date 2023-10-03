import { Request, Response } from "express";
import { pool } from "../database/index";
import bcrypt from "bcrypt";

async function usersRegisteration(request: Request, response: Response) {
    try {
        // pool.connect()
        const usersRegisteration = request.body;
        console.log(usersRegisteration);
        const checkingEmailQuery = 'select count(*) as number from users where email =$1'
        const result = await pool.query(checkingEmailQuery, [usersRegisteration.email])
        console.log(result);
        const verifyEmail = result.rows[0].number;

        console.log(verifyEmail);

        if (verifyEmail <= 0) {
            const saltRounds = 10;
            bcrypt.hash(usersRegisteration.password, saltRounds, async function (err: any, hash: any) {
                const query = 'INSERT INTO Users (FirstName, LastName, Email, Password, Role) VALUES ($1, $2, $3, $4, $5) returning userid';
                const result = await pool.query(query, [usersRegisteration.firstname, usersRegisteration.lastname, usersRegisteration.email, hash, 'User']);
                response.send(result.rows[0]);
            });
        }
        else {
          
            response.send("Email is taken");

        }
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
    // finally {
    //     pool.close(); // close the connection back to the pool
    //   }
}

async function userLogin(request: Request, response: Response) {
    try {
        // pool.connect()
        const loginUser = request.body;
        console.log(loginUser);
        const emailCheckQuery = 'select * from users where email = $1'
        const checkingEmail: any = await pool.query(emailCheckQuery, [loginUser.Email])
        console.log(checkingEmail.rows);
        if (checkingEmail.rows.length === 0) {
          
            response.send("Email is not available")
        } else {
            bcrypt.compare(loginUser.Password, checkingEmail.rows[0].password, function (err, result) {
                if (result == true) {
                    response.send(checkingEmail.rows[0])
                } else {
                    response.send("Password is incorrect")
                }
            });
        }
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
    // finally {
    //     pool.close(); // close the connection back to the pool
    //   }
}

export { usersRegisteration, userLogin }