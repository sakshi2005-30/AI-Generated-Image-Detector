const multer=require("multer");
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(!file.mimetype.startsWith("image")){
        cb(new Error("Only images are allowed"),false);
    }
    cb(null,true)
}
const upload=multer({
    storage,
    fileFilter
})
module.exports=upload;