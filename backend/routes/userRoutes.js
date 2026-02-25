const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout,refresh}=require("../controllers/userController");
const protect=require("../middleware/authMiddleware")
 router.post("/register",registerUser);
router.post("/login",loginUser);
 router.get("/logout",logout);
router.get("/refresh",refresh);
router.get("/me",protect,async(req,res)=>{
    return res.status(200).json({
        message:"Authenticated"
    })
})
module.exports=router;