import express from "express";
import dotenv from "dotenv";
import server from "./server.js";


// DotEnv Configuration 
dotenv.config({
    path: "./data/.env"
})

const app = express();

// definging server PORT
const PORT = process.env.PORT || 3000;


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
server(app, PORT)