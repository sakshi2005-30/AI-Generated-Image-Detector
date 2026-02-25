const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware")

const upload=require("../middleware/uploadMiddleware");
const detectController=require("../controllers/detectController");

router.post("/detect",protect,upload.single("image"),detectController);
module.exports=router;