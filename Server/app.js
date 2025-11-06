import { config } from "dotenv";
import express, { json } from "express"
import db_connect from "./data/db_connect.js";
import cors from 'cors'
import cookieParser from "cookie-parser";

// import ErrorMiddleware from "./middleware/Error.js";

import userRouter from "./routes/user.routes.js"
import generateQrCodeRouter from './routes/generateQrCode.routes.js';


const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err
    });
};
const app = express();

// env Configuration
config({
    path: './data/config.env'
})


// Middleware 
app.use(express.json());
app.use(cookieParser())
// Database Connection
db_connect();

// Cors Configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


// 🧩 4️⃣ Why app.set("trust proxy", 1) is needed
// When you deploy your Node.js server behind a reverse proxy (which happens automatically on Render, Vercel, AWS, etc.),
// Express can’t directly detect that the incoming request is HTTPS — the proxy handles SSL termination.
// So to tell Express:
// “Trust the proxy, it’s handling HTTPS for us,”
app.set("trust proxy", 1);


// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/qr', generateQrCodeRouter);


// Home Route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: `Server running on PORT : ${PORT}`,
        PORT: PORT,
        ProjectName: "Hopify Server"
    })
});


// Server 
const PORT = process.env.PORT ? process.env.PORT : 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})

// Error Middleware
app.use(ErrorMiddleware)
