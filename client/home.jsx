const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');
const { Link } = require('react-router-dom');

// Import your images
const myImage = require('../hosted/img/csgoct.png').default;
const csgosas = require('../hosted/img/csgosas.png').default;
const csgot = require('../hosted/img/csgot.png').default;
const csgot2 = require('../hosted/img/csgot2.jpeg').default;

const handlePost = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = e.target.querySelector('#title').value;
    const topic = e.target.querySelector('#topic').value;
    const content = e.target.querySelector('#content').value;

    if (!title || !topic || !content) {
        helper.handleError('All fields are required!');
        return false;
    }

    const response = await helper.sendPost(e.target.action, { title, topic, content });

    if (response) {
        // If the post request was successful, reset the form
        form.reset();
    }

    return false;
};


const PostForm = () => {
    return (
        <form id="PostForm"
            action="/handlePost"
            onSubmit={handlePost}
            method="POST"
        >
            <h1>Post</h1>
            <label>Title:</label>
            <input id="title" type="text" name="title" placeholder="Title" />
            <div>
                <label>Topic:</label>
                <select name="topic" id="topic">
                    <option value="movement">Movement</option>
                    <option value="map-strats">Map Strats</option>
                    <option value="skins">Skins</option>
                    <option value="gun-stats">Gun Stats</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <label>Content:</label>
            <textarea id="content" name="content" placeholder="Write your post here..."></textarea>
            <div>
                <input className="formSubmit" type="submit" value="Post" />
            </div>
        </form>
    )
}

const HomePage = () => {
    const images = [myImage, csgosas, csgot, csgot2];
    return (
        <>
            <AnimatedImages images={images} id="frame" />
            <PostForm />
            <div id="Feed">
            </div>

        </>

    );
}

const AnimatedImages = ({ images }) => {
    return (
        <div>
            {images.map((imagePath, index) => {
                const randomTop = Math.random() * 60;
                const randomDelay = Math.random() * -10; // random delay between 0s and -20s

                return (

                    <img
                        key={index}
                        src={imagePath}
                        className="animated-image"
                        style={{
                            width: `${Math.random() * 200 + 50}px`, top: `${randomTop}vh`,
                            animationDelay: `${randomDelay}s`, // set random animation delay
                        }} // random size between 50px and 250px

                    />
                );
            })}
        </div>
    );
};

export default Layout;

const init = () => {

    const root = createRoot(document.getElementById('content'));

    root.render(
        <HomePage />
    )
}

window.onload = init;