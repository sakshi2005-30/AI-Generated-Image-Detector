require("dotenv").config();
const express=require("express");
const app=express();
const connectToDB=require("./database/db");
const userRoutes=require("./routes/userRoutes")
const detectRoutes=require("./routes/detectRoutes")
const cookieParser=require("cookie-parser")
const cors=require("cors");

const PORT=process.env.PORT;
connectToDB()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
 app.use("/api/user",userRoutes)
 app.use("/api/image",detectRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})