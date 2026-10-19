import mongoose , {Schema} from "mongoose"
import {model} from "mongoose"

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

export const user = model("user",userSchema);