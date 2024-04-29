// Import the Post model for database operations
const Post = require('../models/Post');

// Renders the home page
const mainPage = async (req, res) => res.render('home');

// Renders the change password page
const changePasswordPage = (req, res) => res.render('loginPage');

// Creates a new post with the given title, topic, and content
const post = async (req, res) => {
    const { title, topic, content } = req.body;
    
    // Initializes a new Post instance
    const newPost = new Post({
        title,
        topic,
        content,
        // Additional fields can be added here if necessary
    });

    try {
        // Saves the new post to the database
        await newPost.save();
        // Responds with the created post and a 201 status code indicating successful creation
        res.status(201).json(newPost);
    } catch (error) {
        // Logs the error and responds with a 409 status code indicating a conflict or error
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};

// Retrieves posts from the database, optionally filtered by topic
const getPosts = async (req, res) => {
    try {
        let posts;
        // Checks if a topic query parameter is provided and filters posts by topic if present
        if(req.query.topic){
            posts = await Post.find({ topic: req.query.topic }).sort({ _id: -1 });
        } else {
            // Retrieves all posts if no topic filter is provided
            posts = await Post.find().sort({ _id: -1 });
        }
        // Responds with the retrieved posts and a 200 status code indicating success
        res.status(200).json(posts);
    } catch (error) {
        // Logs the error and responds with a 500 status code indicating a server error
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Exports the functions to be used in other parts of the application
module.exports = {
    mainPage,
    post,
    changePasswordPage,
    getPosts
};
