import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import dotenv from 'dotenv';
import transectionRoute from './routes/transactions.js';
import userRoute from './routes/user.js';

const app = express();
dotenv.config();  // Load environment variables

const PORT = process.env.PORT || 5000;  // Fallback to port 5000 if not specified

// CORS Middleware: This ensures the frontend can communicate with your backend
app.use(cors({
    origin: "https://penny-wise-mern.vercel.app",  // Allow only this specific frontend
    methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],  // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
    credentials: true,  // Allow credentials (cookies, authorization headers)
}));

// Middleware to parse JSON requests
app.use(express.json());  // Parse incoming requests with JSON payloads

// Routes: Define your routes for the API
app.use("/api/v1/transections", transectionRoute);  // Route for transactions
app.use("/api/v1/users", userRoute);  // Route for users

// Manual handling of preflight `OPTIONS` requests (optional but not necessary with `cors` middleware)
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://penny-wise-mern.vercel.app");  // Allow the frontend origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");  // Allowed headers
    res.sendStatus(200);  // Respond with 200 OK
});

// Start the server and connect to the database
const server = () => {
    db();  // Initialize the database connection
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

server();  // Invoke the server startup function
