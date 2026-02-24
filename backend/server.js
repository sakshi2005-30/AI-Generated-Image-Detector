require("dotenv").config();
const express=require("express");
const app=express();
const connectToDB=require("./database/db");
const userRoutes=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")

const PORT=process.env.PORT;
connectToDB()
app.use(express.json());
app.use(cookieParser());
 app.use("/api/user",userRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})