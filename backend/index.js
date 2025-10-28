import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {userRoutes} from './src/routes/userAuthRoutes.js';

dotenv.config();
mongoose.set("strictQuery", false);

import verifyToken from './src/middleware/auth.js';

const app = express();
app.use(express.json());

app.use('/user', userRoutes);

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
