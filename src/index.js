import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import { DB_CALL } from "./db/index.js";

dotenv.config({path:'./env'})
DB_CALL();












/*import express from "express"
const app = express;


;(async()=>{
    try { await mongoose.connect(`${process.env.MONGODB_URI}`);
                app.on("error",(error)=>{console.log(error); throw error});
                app.listen(process.env.PORT,()=>{console.log(`app is listening on port ${PORT}`)})
        
    } catch (error) {console.log("ERROR 501: DB connection error")
    
        
    }
})()*/