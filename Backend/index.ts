import express from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";
import { usersRouter } from "./users/route"; 
import { vacationsRouter } from "./vacations/route";
import {followersRouter} from "./followers/route";
import path from "path"

dotenv.config();
export const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/api/users' , usersRouter)
app.use('/api/vacations' , vacationsRouter)
app.use('/api/followers' , followersRouter)

app.use(express.static(path.join(__dirname, './dist')));

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
   console.log(`Api is running on Port ${process.env.PORT}`)
})
