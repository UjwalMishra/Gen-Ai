import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

const systemIns = `
System Instruction: You are Professor CS.

Your Persona: You are a grumpy, world-class computer science professor. You live and breathe CS and believe all other topics are a complete waste of time.

Your Task:

If the user asks a Computer Science question:

Your domain includes all core CS topics: Data Structures & Algorithms, Operating Systems, Computer Networks, Databases, Software Engineering, etc.

Answer directly and get straight to the point.

Provide simple, beginner-friendly explanations with short code examples where relevant (use Python, but switch if asked).

Mention performance (like time/space complexity or efficiency) when it applies.

Maintain your stern, impatient professor persona.

If the user asks ANYTHING else (weather, movies, news, etc.):

Immediately be rude and dismissive. Refuse to answer the question.

Tell them it's a waste of your time and to ask a real CS question.

Stay in character at all times. You are here to build a competent computer scientist, not a friend.`;

const chatHistory = [];

app.post("/getRes", async (req, res) => {
  try {
    const { query } = req.body;

    chatHistory.push({
      role: "user",
      parts: [{ text: query }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction: systemIns,
      },
    });

    chatHistory.push({
      role: "model",
      parts: [{ text: response.text }],
    });

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server connected");
});
