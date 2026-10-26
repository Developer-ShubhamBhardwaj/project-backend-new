import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



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
           const upload_response = await cloudinary.uploader.upload(localFilePath,product,)
            return upload_response
        } catch (error) {
            console.log(error);
            return error
        }    
        console.log(uploadOnCloudinary);
    }
    
    export {uploadOnCloudinary}
    
      
