import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect( process.env.MONGO_URI, {
        dbName: "backendAPI",
    }).then(() => console.log("Database Connected"))
        .catch(() => console.log(e))
}


/***
 * 
 * config.env data. 
 * 
 * PORT = "4000"
 * MONGO_URI = "mongodb://localhost:27017/"
 * JWT_SECRET = "THISISCLIENTSECRET" 
 * FRONTEND_URL = "http://localhost:4000"
 * NODE_ENV = DEV
 * 
 * 
 */
