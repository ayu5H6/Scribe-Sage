import React from 'react'
import { useNavigate } from "react-router-dom";
import "../components/Home.css"
const Home = () => {

  const navigate=useNavigate();
  return (
    <>
      <div className="min-h-screen  home">
        <div className="main-div  p-6   ">
          <div className="item1 item text-center p-6">
            <h1 className="text-4xl font-bold mb-4">
              Unleash Your Creativity with AI
            </h1>
            <p className="text-lg ">
              Transform your thoughts into words effortlessly. Whether it's a
              poem, a caption, or a story, our AI is your personal writing
              companion.
            </p>
          </div>

          <div className="item2 item  p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-purple-900">
              ✨ Generate Poems
            </h2>
            <ul className="list-disc list-inside ">
              <li>AI-crafted verses tailored to your emotions</li>
              <li>Express yourself through beautiful poetry</li>
              <li>From romantic sonnets to deep reflections</li>
            </ul>
          </div>

          <div className="item3 item bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-900">
              📸 Create Captions
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Perfect captions for your social media posts</li>
              <li>Trendy, witty, or heartfelt—tailored to your style</li>
              <li>Boost engagement with AI-powered creativity</li>
            </ul>
          </div>

          <div className="item4 item bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-lime-800">
              📖 Storytelling Made Easy
            </h2>
            <ul className="list-disc list-inside ">
              <li>Turn your ideas into compelling narratives</li>
              <li>Short stories, adventures, and heartfelt tales</li>
              <li>AI-powered storytelling that feels human</li>
            </ul>
          </div>
        </div>
        <div className="second-grid p-6 -mt-6  ">
          <div className="item5 item bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-900">
              🚀 Why Choose Us?
            </h2>
            <ul className="list-disc list-inside ">
              <li>💡 AI trained for creative and engaging writing</li>
              <li>🎨 Unique, customized content every time</li>
              <li>⚡ Instant results with high-quality output</li>
              <li>✅ No writer’s block—just inspiration!</li>
            </ul>
          </div>
          <div className="item6 item bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-800">
              📌 How It Works
            </h2>
            <ol className="list-decimal list-inside text-white">
              <li>Enter your idea or keywords</li>
              <li>Select the type of content (Poem, Caption, Story)</li>
              <li>Let AI generate a unique and creative piece</li>
              <li>Refine, edit, and use it anywhere!</li>
            </ol>
          </div>
        </div>
        <div className="-mt-3 flex items-center justify-center ">
          <button className=" p-3 mb-3 rounded-2xl cursor-pointer start  " onClick={()=>navigate("/login")}>Start Now</button>
        </div>
      </div>
    </>
  );
}

export default Home



