const fs=require("fs");
const detectImage=require("../config/signtEngine");

const detectImageController=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(404).json({
                message:"No image uploaded"
            })
        }

        const imagePath=req.file.path;
        const data=await detectImage(imagePath);
        //console.log("data:",data);
        const aiScore=data.type.ai_generated
        let result,confidence;
        if(aiScore>0.6){
            result="AI Generated",
            confidence=aiScore
        }
        else{
            result="Real Image",
            confidence=1-aiScore
        }
        fs.unlinkSync(imagePath);
        res.json({
            result,
            confidence:(confidence*100).toFixed(2)+"%"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
module.exports = detectImageController;