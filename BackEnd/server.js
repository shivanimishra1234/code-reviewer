// const app = require('./src/app')
// require('dotenv').config()

// app.listen(3000,()=>{
//     console.log('Server is running on port 3000')  // log the server listening message to the console
// })


import app from './src/app.js';
import dotenv from 'dotenv';
import express from 'express'
import cors from "cors";
app.use(cors());


dotenv.config();

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
