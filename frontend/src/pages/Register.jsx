import { useState,useContext } from 'react';
import {X} from "lucide-react"
import Home from './Home'
import api from "../utils/api"
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
const Register = () => {
  const {setUser}=useContext(AuthContext)

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const handleRegister=async(e)=>{
    e.preventDefault();
    try{
      const user=await api.post("/user/register",{
        username,email,password
      })
      console.log("user:",user);
      setUser(true);
      setUsername("");
      setEmail("");
      setPassword("");
      
      navigate("/home")

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <Home />

      <div className=" z-30   inset-0 fixed  flex justify-center items-center backdrop-blue-xl bg-black/30 ">
        <div className="  w-100 mx-auto bg-white text-slate-900 rounded-lg px-6 py-4 flex flex-col">
          <div className="relative ">
            <p className="text-center text-lg font-lg font-medium">
              Create an account
            </p>
            <X className="absolute top-2 hover:text-black/60  right-0 w-5 h-5" onClick={()=>navigate("/home")}/>
          </div>

          <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
            <label htmlFor="" className="">
              <p className="text-sm font-medium mb-1">Username</p>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="border w-full px-4 py-1 rounded-lg border-gray-400 outline-none focus-within:border-gray-600"
              />
            </label>
            <label htmlFor="" className="">
              <p className="text-sm font-medium mb-1">Email</p>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border w-full px-4 py-1 rounded-lg border-gray-400 outline-none focus-within:border-gray-600"
              />
            </label>
            <label htmlFor="" className="">
              <p className="text-sm font-medium mb-1">Password</p>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border w-full px-4 py-1 rounded-lg border-gray-400 outline-none focus-within:border-gray-600"
              />
            </label>
            <button className="w-full border rounded-lg px-4 py-2 text-center bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 ">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register