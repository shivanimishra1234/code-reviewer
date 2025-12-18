// const aiService = require("../services/ai.service")

// module.exports.getResponse = async (req,res) =>{
//     const prompt = require.query.prompt;
//     if(!prompt){
//         return res.status(400).send('Please provide a prompt.');
//     }
//     const response = await aiService(prompt);
//     res.send(response);
// }


import generateContent from "../services/ai.service.js";

export const getReview = async(req, res) => {
    try{
        const {code} = req.body;
        console.log("Received code review request");
        console.log("Code length:", code?.length);

        if (!code) {
            return res.status(400).json({"error": 'Please provide code to review.'});
        }
        
        console.log("Calling AI service...");
        const response = await generateContent(code);
        console.log("AI response received, length:", response?.length);
        res.status(200).json({"response":response});
    }
    catch(error){
        console.error("Controller Error:", error.message);
        console.error("Full error:", error);
        res.status(500).json({"error": error.message});
    }
}
