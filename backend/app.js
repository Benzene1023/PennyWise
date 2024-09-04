import express, { json } from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import { readdirSync } from 'fs';
import dotenv from "dotenv";
import transectionRoute from './routes/transactions.js';
import userRoute from './routes/user.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin: "https://penny-wise-mern.vercel.app", // Specific origin allowed
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Adjust headers if needed
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON requests

// Define routes after applying CORS middleware
app.use("/api/v1/transections", transectionRoute);
app.use("/api/v1/users", userRoute);


const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
}

server();
