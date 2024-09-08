import express from 'express';
import cors from 'cors';
import { db } from './db/db.js'; // Adjust this import path if necessary
import dotenv from 'dotenv';
import transectionRoute from './routes/transactions.js'; // Adjust this import path if necessary
import userRoute from './routes/user.js'; // Adjust this import path if necessary

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if not set

// CORS Middleware: Configure CORS for preflight and actual requests
app.use(cors({
    origin: "https://penny-wise-mern.vercel.app", // Allow only this specific frontend origin
    methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true // Allow credentials (cookies, authorization headers)
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define your API routes
app.use("/api/v1/transections", transectionRoute);
app.use("/api/v1/users", userRoute);

// Handle preflight `OPTIONS` requests for all routes
app.options('*', cors());

// Start the server and connect to the database
const server = () => {
    db(); // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
