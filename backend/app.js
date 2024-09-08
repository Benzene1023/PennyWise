import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import dotenv from 'dotenv';
import transectionRoute from './routes/transactions.js';
import userRoute from './routes/user.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://penny-wise-mern.vercel.app", // Update to the correct front-end URL
    methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// Define API routes
app.use("/api/v1/transections", transectionRoute);
app.use("/api/v1/users", userRoute);

// Handle preflight `OPTIONS` requests for all routes
app.options('*', cors());

const server = () => {
    db(); // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
