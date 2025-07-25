import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL, { dbName: "helpify" }).then((res) => {
        console.log("Database connected.");
    }).catch((err) => {
        console.log(`Database connection failed : ${err}`);
    });

};

export default dbConnection;