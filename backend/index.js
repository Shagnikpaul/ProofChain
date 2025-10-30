import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {userRoutes} from './src/routes/userAuthRoutes.js';
import {userProfileRoutes} from './src/routes/userProfileRoutes.js';
import {billRoutes} from './src/routes/billRoutes.js';

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/profile', userProfileRoutes);
app.use('/bill', billRoutes);

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
