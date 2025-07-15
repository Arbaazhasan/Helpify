import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import server from "./server.js";
import dbConnection from "./config/dbConnection.js";
import errorMiddleware from "./middleware/error.js";


// Routers 
import userAuthenticationRouter from "./routes/userAuthentication.routes.js";
import cookieParser from "cookie-parser";

// DotEnv Configuration 
dotenv.config({
    path: "./config/config.env"
})

// Database Connection 
dbConnection();


// Express App
const app = express();

// apply the middleware to get the json data into the req.body;
app.use(json());

// middleware use to get the cookies form the client side to the server side 
app.use(cookieParser());

// definging server PORT
const PORT = process.env.PORT || 3000;




// User Authentication routes
app.use("/helpify/api/v1/", userAuthenticationRouter);

// default route
app.use("/", (req, res) => {
    res.json({
        success: true,
        projectName: "Hopify",
        port: PORT,
        message: `Server runing on port : ${PORT}`,
    });
});

// server connection
server(app, PORT);

app.use(errorMiddleware);