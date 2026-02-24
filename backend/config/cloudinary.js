const cloudinary=require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  cloud_api_key:process.env.CLOUDINARY_API_KEY,
  cloud_secret_key:process.env.CLOUDINARY_SECRET_KEY
});
module.exports=cloudinary