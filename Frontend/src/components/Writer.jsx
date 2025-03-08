import React, { useRef, useState, useCallback } from "react";
import "./Writer.css";
import axios from "axios";
const Writer = () => {
  const [userInput, setUserInput] = useState("");
  const [ans, setAns] = useState("");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("small");
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const ansRef = useRef(null);

  const toneOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
    { value: "humorous", label: "Humorous" },
    { value: "creative", label: "Creative" },
    { value: "persuasive", label: "Persuasive" },
    { value: "inspirational", label: "Inspirational" },
    { value: "sarcastic", label: "Sarcastic" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "empathetic", label: "Empathetic" }, 
    { value: "optimistic", label: "Optimistic" },
    { value: "motivational", label: "Motivational" },
    { value: "mysterious", label: "Mysterious" },
    { value: "professional", label: "Professional" },
    { value: "technical", label: "Technical" },
    { value: "witty", label: "Witty" },
  ];
  const textLength = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];
  const copyToClipBoard = useCallback(() => {
    ansRef.current?.select();
    window.navigator.clipboard.writeText(ans);
  }, [ans]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const generateAnswer = async () => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

    try {
      setLoader(true);
      const requestData = {
        prompt: userInput,
        tone: tone,
        length: length,
      };
      if (image) {
        requestData.image = image;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
      const aiResponse =
        response.data.candidates[0]?.content?.parts[0]?.text ||
        "No response generated.";
      setAns(aiResponse);
      setCount(aiResponse.split(/\s+/).filter((word) => word !== "").length);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className=" flex justify-center  px-4 w-full main overflow-y-hidden">
        <div className="flex flex-col sm:flex-row justify-center items-center p-6 box   w-full max-w-6xl">
          {/* Left Column - Input */}
          <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 sm:pr-4">
            <div className="flex flex-wrap items-center mb-2  p-2 ">
              <h2 className="mr-5 text-xl sm:text-2xl mb-2 sm:mb-0">
                Your Idea
              </h2>
              <div className="flex flex-wrap gap-4">
                <select
                  name="useCase"
                  value={tone}
                  title="Tone"
                  onChange={(e) => setTone(e.target.value)}
                  className="text-sm text-center border-1 rounded sel"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  name="Text-Length"
                  value={length}
                  title="text-length"
                  onChange={(e) => setLength(e.target.value)}
                  className="text-sm text-center border-1 rounded sel "
                >
                  {textLength.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              cols={6}
              rows={6}
              name="input"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              className=" w-full h-40 sm:h-48 resize-none"
              placeholder="Enter what text you want to generate..."
            />

            <div className="flex flex-col sm:flex-row mt-2 justify-center w-full items-center gap-2 sm:gap-4">
              <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                <label
                  htmlFor="image-input"
                  className="block text-xs text-gray-100 "
                >
                  Upload an Image (JPG, PNG, etc.)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  alt="Drop image"
                  title="image-input"
                  className="w-full text-sm"
                  onChange={handleImage}
                />
              </div>
              <button
                className="bg-blue-200 w-full sm:w-1/2 p-2 rounded hover:bg-blue-400 "
                disabled={loader}
                onClick={generateAnswer}
              >
                {loader ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="flex flex-col w-full sm:w-1/2 sm:pl-4">
            <div className="flex flex-col items-center mb-2 p-2">
              <h2 className="text-xl sm:text-2xl">Generated Text</h2>
            </div>

            <textarea
              cols={6}
              rows={6}
              name="output"
              className=" w-full h-40 sm:h-48 resize-none"
              value={ans}
              placeholder="Output..."
              ref={ansRef}
              readOnly
            />

            <div className="flex flex-col sm:flex-row mt-3 items-center gap-2">
              <div className="w-full sm:w-1/2">
                <p className="text-sm sm:text-base para">Word Count: {count}</p>
              </div>
              <div className="w-full sm:w-1/2">
                <button
                  className="bg-purple-200 w-full p-2 rounded hover:bg-purple-400"
                  onClick={copyToClipBoard}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Writer;
