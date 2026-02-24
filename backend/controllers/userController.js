const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const createAccessToken=(id)=>{
    return jwt.sign({id:id},process.env.ACCESS_SECRET,{expiresIn:"15m"});
}
const createRefreshToken = (id) => {
  return jwt.sign({ id: id }, process.env.REFRESH_SECRET, { expiresIn: "15d" });
};

const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username ||!email || !password){
            return res.status(404).json({
                message:"All fields are required"
            })
        }

        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(404).json({
                message:"User already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hashedPassword
        })
        const accessToken=createAccessToken(user._id);
        const refreshToken=createRefreshToken(user._id);

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.status(201).json({
            data:user
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).json({
                message:"All fields are required"
            })
        }
        const userExists=await User.findOne({email});
        if(!userExists){
            return res.status(404).json({
                message:"User not registered"
            })
        }
       
        const comparePassword=await bcrypt.compare(password,userExists.password);
        if(!comparePassword){
            return res.status(404).json({
                message:"email or pasword is wrong"
            })
        }
        const accessToken=createAccessToken(userExists._id);
        const refreshToken=createRefreshToken(userExists._id);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });
        res.status(201).json({
          data: userExists,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
const logout=async(req,res)=>{
    try{
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
            message:"User logged out"
        })

    }
    catch(error){
         console.log(error);
         res.status(500).json({
           message: "Server error",
         });
    }
}
const refresh=async(req,res)=>{
    try{
        const token=req.cookies.refreshToken;
        if(!token){
            return res.status(404).json({
                message:"No refresh token"
            })
        }
        const decoded=jwt.verify(token,process.env.REFRESH_SECRET);
        const newAccessToken=createAccessToken(decoded.id);
        res.cookie("accessToken",newAccessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.status(200).json({
            message:"Access Token refreshed"
        })
    }

    catch(error){
         console.log(error);
         res.status(500).json({
           message: "Server error",
         });
    }
}
module.exports={registerUser,loginUser,logout,refresh}