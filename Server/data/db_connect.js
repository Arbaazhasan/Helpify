import mongoose from "mongoose"


const db_connect = () => {

    mongoose.connect(process.env.MONGO_URI, { dbName: "helpify" }).then((res) => {
        console.log("Database Connected.")
    }).catch((e) => {
        console.log("Error from Database connection : " + e)
    });
};

export default db_connect;