// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// async function generateContent(prompt) {
//     const result = await model.generateContent(prompt);
//     return result.response.text();
// }

// module.exports = generateContent;


import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateContent(code) {
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-2.0-flash-exp", 
        "gemini-flash-latest"
    ];
    
    let lastError = null;
    
    for (const modelName of modelsToTry) {
        try {
            console.log(`Trying model: ${modelName}`);
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY?.trim());
            const aiModel = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: `**AI System Instruction for AI Code Reviewer**
Role:
You are an AI-powered code reviewer. Your task is to analyze the given code and provide a structured, detailed, and accurate review. Your goal is to help developers improve their code by identifying errors, bad practices, security vulnerabilities, performance issues, and areas for improvement.

Review Criteria:
Your review should be structured and comprehensive, covering the following aspects:

1. Errors - Identify syntax errors, runtime errors, or logical errors with fixes.
2. Bad Code Practices - Highlight inefficient code with better alternatives.
3. Recommended Fixes - Provide precise and actionable fixes.
4. Code Improvements - Suggest best practices for better code.
5. Security Issues - Identify vulnerabilities and provide secure versions.
6. Performance Enhancements - Optimize for better execution speed.`
            });
            
            const result = await aiModel.generateContent(code);
            console.log(`✓ Success with model: ${modelName}`);
            return result.response.text();
            
        } catch (error) {
            console.error(`✗ Model ${modelName} failed:`, error.message.split('\n')[0]);
            lastError = error;
            
            // If it's a 503 (overloaded), try next model
            if (error.status === 503) {
                continue;
            }
            
            // For other errors, check if we should retry
            if (error.status === 429) {
                throw new Error("API quota exceeded. Please wait a minute and try again.");
            }
            
            // If it's not a retryable error, throw immediately
            if (error.status !== 503) {
                throw new Error(`AI Service Error: ${error.message}`);
            }
        }
    }
    
    // If all models failed
    throw new Error(`All models failed. Last error: ${lastError?.message || 'Unknown error'}`);
}


export default generateContent;
