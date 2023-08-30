import express, { Request, Response, NextFunction } from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";
// import { gamesRouter } from "./games/route"; // מייבא את הראוט
dotenv.config();
const app = express(); // להעתיק את השורה
app.use(express.json()); // להעתיק את השורה
app.use(cors()); // להעתיק את השורה
// app.use('/games' , gamesRouter) // מפעיל את הראוטר ברגע שהוא נכנס לכתובת של /games

// להעתיק את השורות הבאות
app.listen(process.env.PORT, () => {
   console.log(`Api is running on Port ${process.env.PORT}`)
})
