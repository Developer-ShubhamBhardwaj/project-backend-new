const asynchandler = (requesthandler)=>{
    return async (req,res,next)=>{
       try {
            await requesthandler(req,res,next)
        } catch (err) {next(err)
            }
    
    }
}



/*
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
               .catch((err) => next(err));
    };
};
*/







export {asynchandler}

// const asynchandler = (fn)=> async (req,res,next)=>{
//     try {await fn(req,res,next)
//     } 
//     catch (error) { console.log(error); res.status(error.code || 500).json({success:false,message:error.message})}
//     }
