const Post = require('../models/Post'); 

const mainPage = async (req, res) => {
    return res.render('home');
}

const post = async (req, res) => {
    const { title, topic, content } = req.body;
    

    const newPost = new Post({
        title,
        topic,
        content,
        // Add other fields as necessary
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};


module.exports = {
    mainPage,
    post,
}