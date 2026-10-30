import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { apierror } from './apierror.js';
import "dotenv/config"



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
        
    })  
    
    // Upload an image
    const uploadOnCloudinary = async function(localFilePath){
        try { if(!localFilePath) return null
            //upload file on claudinary
           const upload_response = await cloudinary.uploader.upload(localFilePath)
            return upload_response
        } catch (error) {
            fs.unlink(localFilePath,(err)=>{if(err) throw new apierror(504,"corrupt file not unlinked");
                return "file unlinked"} )
            console.log(error);
            return error
        }    
        console.log(uploadOnCloudinary);
    }
    
    export {uploadOnCloudinary}
    
      
