const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Enable CORS for all routes

// MongoDB connection URI
const uri = 'mongodb+srv://sannithnalluri:Sannith2003@eventdatabase.kcuqxzh.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
let db;
async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('EventsData');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Fetch all users route
app.get('/users', async (req, res) => {
    try {
        const usersCollection = db.collection('users');
        const users = await usersCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Connect to MongoDB and start the server
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
