const Post = require('../models/Post'); 

const mainPage = async (req, res) => res.render('home');
const changePasswordPage = (req, res) => res.render('loginPage');


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

const getPosts = async (req, res) => {
    try {
        let posts;
        if(req.query.topic){
            posts = await Post.find({ topic: req.query.topic }).sort({ _id: -1 });
        } else {
            posts = await Post.find().sort({ _id: -1 });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    mainPage,
    post,
    changePasswordPage,
    getPosts
}