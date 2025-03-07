require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" })); // Increase JSON payload size
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, tone, length, image } = req.body;

    let requestBody;
    let model;

    if (image) {
      // Using Gemini 1.5 Flash for images
      const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
      model = "gemini-1.5-flash";
      requestBody = {
        contents: [
          {
            parts: [
              { inlineData: { mimeType: "image/png", data: base64Image } },
              {
                text: `Generate a caption for this image in a **${tone}** tone and **${length}** length. Include emojis and hashtags.`,
              },
            ],
          },
        ],
      };
    } else {
      // Use Gemini 2.0 Flash for text-based tasks
      model = "gemini-2.0-flash-lite";
      requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are a professional AI writing assistant. Your job is to help users with writing tasks such as essays, poems, emails, stories, and captions. 
                            If a user asks something unrelated to writing, politely refuse to answer. Please write in a **${tone}** tone and ensure the response is **${length}** in length.

                            **User's request:** "${prompt}"
                            **AI's response:**`,
              },
            ],
          },
        ],
      };
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
