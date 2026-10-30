import "dotenv/config"

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import { DB_CALL } from "./db/index.js";
import app from "./app.js"
import { asynchandler } from './utils/asynchandler.js';



DB_CALL()
.then(()=>{
    // console.log(`this is the port: ${process.env.PORT}`);
    const PORT = Number(process.env.PORT) || 3000 ;
    console.log(`${PORT}: this port  is ready`);
    
    
    app.listen( PORT,
        ()=>{console.log(`app is listening on port ${PORT}`)})
})
.catch((err)=>{console.log(`error: server not listening\n${err}`);
})





// .then(()=>{
//             app.listen(process.env.PORT || 2000 ,
//                 ()=>{console.log(`app is listening on port ${process.env.PORT}`)}
//             )
//         }
//     )
// .catch((err)=>{console.log(err)})

// app.listen(2000,()=>{console.log("listening on port 2000")})











/*import express from "express"
const app = express;


;(async()=>{
    try { await mongoose.connect(`${process.env.MONGODB_URI}`);
                app.on("error",(error)=>{console.log(error); throw error});
                app.listen(process.env.PORT,()=>{console.log(`app is listening on port ${PORT}`)})
        
    } catch (error) {console.log("ERROR 501: DB connection error")
    
        
    }
})()*/