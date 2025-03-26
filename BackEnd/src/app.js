// const express = require('express');
// const aiRoutes = require("./routes/ai.routes")

// const app = express()

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.use("/ai", aiRoutes);

// module.exports = app


import express from 'express';
import aiRoutes from './routes/ai.routes.js';  // Ensure the correct path with `.js`
//app.use(express.json())
import cors from 'cors'


const app = express();
app.use(cors())

app.use(express.json({limit: "50mb"}));

app.post('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/ai", aiRoutes);

export default app;
