// Load environment variables FIRST, before any other imports
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables loaded');
console.log('API Key present:', !!process.env.GOOGLE_GEMINI_KEY);
console.log('API Key length:', process.env.GOOGLE_GEMINI_KEY?.length);

// Validate critical environment variables before importing app
if (!process.env.GOOGLE_GEMINI_KEY) {
    console.error('ERROR: GOOGLE_GEMINI_KEY is not defined in .env file');
    process.exit(1);
}

// Now import app after environment is configured
import app from './src/app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`✓ Server is running on port ${PORT}`);
    console.log(`✓ API Key loaded successfully`);
    console.log(`✓ Ready to accept requests`);
});
