import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiresponse } from "../utils/apirespnse.js";



const registeruser = asynchandler(
    async (req, res)=>{
        
       const {fullName,coverimage,email,userName,password}=req.body
        
       
       //empty area validation

       if(
            [fullName,email,userName,password].some(
                (field)=>field.trim()==="" ? true:false
            )                                               
        ){
            throw new apierror(400, "All fields are required");
        }
        
        
        //existing username or email validation 

       const existingUser = await User.findOne({
            $or:[{ userName }, { email }]
        })
        if (existingUser){throw new apierror(400,"already exist")
           }       

        
        
        
            
            
        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath =  req.files?.coverImage[0].path

        if(!avatarLocalPath){throw new apierror(404,"Error: avatar not uploaded")}
        
        if(!coverImageLocalPath){throw new apierror(404,"Error: cover image not uploaded")}
        
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){throw new apierror(404,"Error: avatar is required")}

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            userName: userName.toLowerCase()
        })

        const createdUser =await User.findById(user._id)
                                .select("-password -refreshToken")
    
        if(!createdUser){throw new apierror(500,"something went wrong while registering the user")};

        return res.status(201).json(
            new apiresponse(200,createdUser,"user registered successfully")
        )
        
    }
)

const loginUser =  asynchandler(
    async (req,res)=>{
        console.log(req);
        
        const user = await User.findOne({userName:req.body.userName})
        console.log(user);
        
        if(!user){let myErr = new apierror(401,"error: user not found");res.send(myErr);console.log(myErr);
        }
        else if( user.isPasswordCorrect(req.body.password) ){res.send(`${user.userName} login successfully`)}



    }
)

export {registeruser , loginUser};


     