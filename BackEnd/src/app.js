import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://code-reviewer-ximg.vercel.app'] 
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8000'],
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World! Backend is running.');
});

app.use("/ai", aiRoutes);

export default app;
