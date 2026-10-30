import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"
import "dotenv/config"


const app = express();


app.use(express.json({
            limit:"16kb"
}))

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true,
}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(cookieParser())

app.use(express.static("public"))

//routes import 
import userRouter from "./routes/users.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)
app.get("/",(req,res)=>{res.send("hello shubham");
    const body = req.body
    console.log(body)
})




export default app