const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Middleware to parse JSON requests

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/collegeSearchApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Define Thread Schema
const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Thread = mongoose.model('Thread', threadSchema);

// Root Route
app.get('/', (req, res) => {
    res.status(200).send("Welcome to College Search Backend!");
});

// Create a New Thread
app.post('/threads', async (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Validate the input
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Create a new thread
        const newThread = new Thread({ title, content });
        await newThread.save(); // Save it to the database

        // Respond with success
        res.status(201).json({ message: "Thread created successfully!", thread: newThread });
    } catch (error) {
        console.error("Error creating thread:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get All Threads
app.get('/threads', async (req, res) => {
    try {
        const threads = await Thread.find().sort({ createdAt: -1 }); // Sort threads by creation date (newest first)
        res.status(200).json(threads);
    } catch (error) {
        console.error("Error fetching threads:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update an Existing Thread
app.put('/threads/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Validate the input
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Find the thread by ID
        const thread = await Thread.findById(id);
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }

        // Update the thread with new title and content
        thread.title = title;
        thread.content = content;
        thread.updatedAt = new Date(); // Update the timestamp

        // Save the updated thread
        await thread.save();

        // Respond with success
        res.status(200).json({ message: "Thread updated successfully!", thread });
    } catch (error) {
        console.error("Error updating thread:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Routes for search-related functionality (example)
const searchRoutes = require("./controllers/search");
app.use("/search", searchRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
