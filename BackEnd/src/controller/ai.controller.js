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
        const {code} = req.body;  // FIXED
        console.log("test")

        if (!code) {
            return res.status(400).send('Please provide a prompt.');
        }
        const response = await generateContent(code);
        res.status(200).json({"response":response});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({"error": error.message});
    }
}
