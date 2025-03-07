import React from "react"
import Login from "./components/Login"
import Home from "./components/Home";
import Navbar from "./components/Navbar"
import Writer from "./components/Writer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
function App() {


  return (
    <>
      <Router>
        <MainLayout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/writer" element={<Writer />} />
        </Routes>
      </Router>
     
    </>
  );
}
 const MainLayout = () => {
   const location = useLocation();
   return location.pathname !== "/login"? <Navbar/>:null;
 };

export default App
