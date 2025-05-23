import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'], // Add your vercel domain later
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World! Backend is running.');
});

app.use("/ai", aiRoutes);

export default app;
