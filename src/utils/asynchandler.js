const asynchandler = (fn)=> async (err,req,res,next)=>{
    try {await fn(req,res,next)
    } 
    catch (error) { console.log(error); res.status(error.code || 500).json({success:false,message:error.message})}
    }
