import mongoose , {Schema} from "mongoose"
import {model} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName:{
            type :String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true
        },

        email:{
            type :String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
        },

        fullName:{
            type :String,
            required: true,
            trim: true,
            index: true
        },

        avatar:{
            type :String, //cloudnary url
            required: true,
        },

        coverImage:{type:String,
        },

        watchHistory:{type : Schema.Types.ObjectId,
            ref:"video"
        },
        password:{type:String,
            required:[true,"password is required"]
        },
        refreshToken:{type:String}

    },
    {timeStamps:true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,5);
    next()
})

userSchema.methods.isPasswordCorrect = 
    async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { _id : this.id,
            name:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiry:ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { _id : this.id,
            name:this.fullName,
            email:this.email,
            userName:this.userName
        },
        process.env.REFRESH_TOKEN_SECRET,

        {expiry:process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const user = model("user",userSchema);