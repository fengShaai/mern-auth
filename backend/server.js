import express from 'express'
import { connectDB } from './config/db.js';
import NoteRoutes from './routes/note.route.js'
import AuthRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from 'cors'


const app = express();
app.use(express.json()); //let parse incoming req.body content
app.use(cookieParser()); // let parse incoming cookies
dotenv.config() // without this there is no way that you are going to access the .env
app.use(cors({origin: "http://localhost:5173", credentials: true})); // how handle auth ?

app.use("/api/notes", NoteRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

