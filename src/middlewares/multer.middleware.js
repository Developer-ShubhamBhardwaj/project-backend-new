import multer from "multer"
import path from "node:path"
import { fileURLToPath } from "node:url";


//path find to current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const finalPath = path.join(__dirname,"../public/temp")

const storage = multer.diskStorage(
    {
        destination:function(req,res,cb){
            cb(null,finalPath)
        },

        
        filename:function(req,file,cb){
            cb(null,file.originalname)
        }

    }
)

export const upload = multer({storage});