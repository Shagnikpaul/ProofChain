// server.js
import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = process.env.ATLAS_URI;

const app = express();
const PORT = 3000;


// mongo db connection 

mongoose.connect(process.env.ATLAS_URI)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });


app.get('/api/helloWorld',
    async (req, res) => {
        res.send("Hello World !!!").status(200);
    });




app.listen(PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    });