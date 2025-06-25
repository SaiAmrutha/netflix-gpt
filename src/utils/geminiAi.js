import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constants";

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
