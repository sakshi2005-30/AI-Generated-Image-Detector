import { useContext,useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {Link,useNavigate} from "react-router"
import { CloudUpload } from "lucide-react"

import api from "../utils/api"

const Home = () => {
  const [image,setImage]=useState(null);
  const [result,setResult]=useState("");
  const [confidence,setConfidence]=useState(null);
  const [loading,setLoading]=useState(false);
  console.log("file:",image)
    const {user,setUser} =useContext(AuthContext)
    const navigate=useNavigate();
    console.log("user:",user);
    const handleDetectImage=async(e)=>{
      e.preventDefault()
      setLoading(true);
      try{
        const formData=new FormData();
        formData.append("image",image);
        const res=await api.post("/image/detect",formData)
        setResult(res.data.result);
        setConfidence(res.data.confidence)
        setImage(null)
        console.log("res",res);
        setLoading(false);
      }
      catch(error){
        setLoading(false);
        console.log(error);
      }
    }
    const handleLogout=async()=>{
      try{
        const res=await api.get("/user/logout");
        setUser(false);
        navigate("/home");
      }
      catch(error){
        console.log(error);
      }
    }

  return (
    <div className="py-6">
      {loading && <div className="inset-0 fixed z-40 flex justify-center items-center"><div className="h-8 w-8 rounded-full border-white border-t-transparent border-4 animate-spin"></div></div>}
      <div className="  w-5xl border mx-auto py-3 px-8 rounded-4xl  backdrop-blur-3xl bg-slate-800  border-slate-700/90 ">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-lg font-bold">
            Detector
          </Link>

          {user ? (
            <button
              className="text-sm font-bold hover:text-white/80 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                className="text-sm font-bold hover:text-white/80"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-white rounded-lg text-slate-900 font-bold text-sm hover:bg-white/80 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="my-8 flex flex-col items-center space-y-2">
        <p className="text-2xl font-medium tracking-wide text-gray-200 ">
          Detect AI Images With Confidence
        </p>
        <p className="text-lg  tracking-wide text-gray-200 ">
          Upload and verify in seconds.
        </p>
      </div>
      {user ? (
        <div className="mt-16 flex justify-center items-center w-70 mx-auto">
          <form
            className="flex flex-col items-center  w-full justify-center "
            onSubmit={handleDetectImage}
          >
            <div className="  border w-full  py-4 px-6 border-dashed rounded-lg bg-slate-700 border-slate-500">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col  justify-center items-center"
              >
                <div className="flex flex-col items-center">
                  {image ? (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">{image.name}</p>
                      <p className="text-sm text-gray-400 mb-2">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {" "}
                      <CloudUpload className="text-gray-400 font-medium mb-4" />
                      <p className="text-sm text-gray-400 mb-2">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-400">
                        SVG,PNG,JPG or JPEG
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            <button className="px-4 py-2 w-full my-4 bg-white text-slate-800 rounded-lg font-medium text-sm hover:bg-white/80">
              Check Image
            </button>
          </form>
        </div>
      ) : (
        <div className="my-4 flex justify-center">
          <button
            className="px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-white/80"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      )}
      <div className="flex flex-col items-center space-y-2">
        {result && (
          <p className="text-lg font-medium text-gray-400 tracking-wider">
            Result:{" "}{result}
          </p>
        )}
        {confidence && (
          <p className="text-lg font-medium text-gray-400 tracking-wider">
            Confidence:{" "}{confidence}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home