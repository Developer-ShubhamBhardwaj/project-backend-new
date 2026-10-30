import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import "dotenv/config"
 const DB_CALL= async ()=>{
      try {
        const connectionInstance =  await mongoose.connect( `${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongodb connected !! DB HOST:${connectionInstance.connection.host}`)
    } catch (error) {console.log(`ERROR:502:An error heppened in database connection\n${error}`);
        process.exit(1);
        
    }

}
export {DB_CALL}