import React, { useState } from "react";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "../components/Login.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const navigate = useNavigate();

  // Register New User
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/writer");
    } catch (err) {
      console.error(err);
    }
  };

  // Sign In Existing User
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/writer");
    } catch (err) {
      console.error(err);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/writer");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col md:flex-row login min-h-screen w-full">
      {/* Left Section - Animation & Text */}
      <div className="left md:w-1/2 w-full flex items-center justify-center p-4  md:border-r-2 md:border-gray-300">
        <div className="text-center p-4 max-w-lg">
          {/* Animation */}
          <div className="w-64 h-64 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            {isRegister ? (
              <DotLottieReact src="/Register.lottie" loop autoplay />
            ) : (
              <DotLottieReact src="/Login.lottie" loop autoplay />
            )}
          </div>

          {/* Heading */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-4">
            {isRegister
              ? "Join Scribe Sage today and unlock your potential! Unleash your creativity and transform your thoughts into captivating, powerful words."
              : "Welcome back! Log in to continue your creative journey with Scribe Sage. Let your words flow effortlessly!"}
          </h2>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="right md:w-1/2 w-full p-4 md:p-8 flex items-center justify-center ">
        <div className=" w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <form
            className="flex flex-col items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              isRegister ? register() : signIn();
            }}
          >
            {/* Heading */}
            <h2 className="text-center mb-6 text-2xl md:text-3xl font-bold text-gray-800">
              {isRegister ? "Register" : "Sign In"}
            </h2>

            {/* Email Input */}
            <div className="log-box w-full mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="log-box w-full mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col w-full items-center">
              <button
                type="submit"
                className="sign-in-button w-full py-3 text-white bg-gradient-to-r from-purple-600 to-blue-500  font-medium rounded-lg shadow-md hover:from-purple-700 hover:to-blue-600 signIn"
              >
                {isRegister ? "Register" : "Sign In"}
              </button>

              <div className="flex items-center w-full my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="mx-4 text-sm text-gray-500">Or</p>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={signInWithGoogle}
                className="google-sign-in-button w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center bg-white hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500 mr-2" />
                <span className="text-gray-800">Sign in with Google</span>
              </button>
            </div>

            {/* Switch between Register/Login */}
            <p className="text-center mt-6 text-sm text-gray-600">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-purple-600 font-medium hover:text-purple-500"
              >
                <span className="underline cursor-pointer ">
                  {isRegister ? "Sign In" : "Register"}
                </span>
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
