// server.js
import express from 'express';
import db from './mongoFunctions.js';

const app = express();
const PORT = 3000;

// To define the sample data 



app.get('/api/getUsers',
    async (req, res) => {
        let collection = db.collection("users");
        let results = await collection.find({})
            .limit(50)
            .toArray();
        res.send(results).status(200);
    });


// app.get('/api/books/:id',
//     (req, res) => {
//         const id =
//             parseInt(req.params.id);
//         const book =
//             books.find(book => book.id === id);
//         if (book) {
//             res.json(book);
//         } else {
//             res.status(404)
//                 .json({ message: 'Book not found' });
//         }
//     });

app.listen(PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    });