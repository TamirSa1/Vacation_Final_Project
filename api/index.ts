import express, { Request, Response, NextFunction } from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";
import { usersRouter } from "./users/route"; 
import { vacationsRouter } from "./vacations/route"
dotenv.config();
const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/users' , usersRouter)
app.use('/vacations' , vacationsRouter)

app.listen(process.env.PORT, () => {
   console.log(`Api is running on Port ${process.env.PORT}`)
})
