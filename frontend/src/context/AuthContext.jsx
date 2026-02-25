import { useState,useEffect,createContext } from "react";
import api from "../utils/api"
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res=await api.get("/user/me");
                if(res && res.data){
                     setUser(true);
                }
               
            }
            catch(err){
                console.log(err);
                setUser(null);
            }
        }
        fetchUser();
    },[]);

    return (
        <div>
            <AuthContext.Provider value={{user,setUser}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}