import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import { DB_CALL } from "./db/index.js";
import app from "./app.js"

dotenv.config({path:'./env'})
DB_CALL()
.then(()=>{
    app.listen(process.env.PORT || 2000 ,
        ()=>{console.log(`app is listening on port ${process.env.PORT}`)})})
.catch((err)=>{console.log(err)})












/*import express from "express"
const app = express;


;(async()=>{
    try { await mongoose.connect(`${process.env.MONGODB_URI}`);
                app.on("error",(error)=>{console.log(error); throw error});
                app.listen(process.env.PORT,()=>{console.log(`app is listening on port ${PORT}`)})
        
    } catch (error) {console.log("ERROR 501: DB connection error")
    
        
    }
})()*/