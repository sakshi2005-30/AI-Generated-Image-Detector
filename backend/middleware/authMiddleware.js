const jwt=require("jsonwebtoken");
const protect=async(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token){
        return res.status(404).json({
            message:"No refresh token"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.ACCESS_SECRET);
        req.user=decoded.id;
        
        next();

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Authentication failed"
        })
    }
}
module.exports=protect