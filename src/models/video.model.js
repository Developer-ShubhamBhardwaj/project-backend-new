import mongoose,{Schema} from "mongoose"
import {model} from mongoose
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"

const videoSchema =  new Schema(
    {
        videoFile:{type:String, //cloudnary url
            required:true
        },

        thumbnail:{type:String, //cloudnary url
            required:true,
        },

        discription:{type:String,
            required:true},
        
        title:{type:String,
            required:true,},

        duration:{type:Number,   //cloudnary url
            },

        views:{type:Number,
            default:0,},

        ispublished:{type:Boolean,
            default:true,
        required:true},
        
        owner:{type: Schema.Types.ObjectId,
            ref:"user"
        }

    },
    {timestamps:true}
)

videoSchema.plugin(mongooseaggregatepaginate)
export const video = new model("video",videoSchema)