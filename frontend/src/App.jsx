import {Routes,Route} from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
const App = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
      
    </div>
  )
}

export default App