import React, { useState, useRef, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RiUserLine } from "@remixicon/react";
import "../components/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="  w-full flex justify-between items-center p-4 bg-gray-900 text-white ">
      {/* Logo */}
      <div className="text-xl md:text-3xl font-bold">
        <h1>Scribe Sage</h1>
      </div>

      {/* User Icon & Dropdown */}
      <div className="relative">
        <button className="border-2 p-2 rounded-md" onClick={toggleDropdown}>
          <RiUserLine size={28} fill="white" />
        </button>

        {open && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 p-0.5 rounded-md shadow-lg">
            <button
              className="  text-center logout "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
