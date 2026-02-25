const axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");
const detectImage=async(imagePath)=>{
    const form=new FormData();
    form.append("media",fs.createReadStream(imagePath));
    form.append("models","genai");
    form.append("api_user",process.env.API_USER);
    form.append("api_secret",process.env.API_SECRET);

    const response = await axios.post(
      "https://api.sightengine.com/1.0/check.json",
      form,
      { headers: form.getHeaders() },
    );
    // console.log("API Response:", response.data);
    return response.data;
}
module.exports=detectImage;