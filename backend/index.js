import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set("strictQuery", false);

import verifyToken from './src/middleware/auth.js';
import loginRoute from './src/routes/login.js'; 

const app = express();
app.use(express.json());

// ✅ Register the /login route
app.use('/', loginRoute);  // now you can call POST /login

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.get('/public', (req, res) => {
    res.json({ message: 'This is public' });
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'This is protected',
        userId: req.userId,
        email: req.userEmail
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
