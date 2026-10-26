import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { user } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiresponse } from "../utils/apirespnse.js";


const registeruser = asynchandler(
    async (req, res)=>{
       const {fullName,email,userName,password}=req.body
        
       
       //empty area validation

       if(
            [fullName,email,userName,password].some(
                (field)=>field.trim()==="" ? true:false
            )                                               
        ){
            throw new apierror(400, "All fields are required");
        }

        
        //existing username or email validation 

       const existingUser = user.findOne({
            $or:[{ username }, { email }]
        })

        if (existingUser){throw new apierror(400,"already exist")}
        

        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath =  req.files?.coverImage[0].path

        if(!avatarLocalPath){throw new apierror(404,"Error: avatar not uploaded")}
        
        //if(!coverImageLocalPath){throw new apierror(404,"Error: cover image not uploaded")}
        
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){throw new apierror(404,"Error: avatar is required")}

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

        const createdUser =await User.findById(user._id)
                                .select("-password -refreshToken")
    
        if(!createdUser){throw new apierror(500,"something went wrong while registering the user")};

        return res.status(201).json(
            new apiresponse(200,createdUser,"user registered successfully")
        )
        
    }
)


export {registeruser};


     