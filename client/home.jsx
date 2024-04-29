const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');
const { Link } = require('react-router-dom');

// Import images for the application
const myImage = require('../hosted/img/csgoct.png').default;
const csgosas = require('../hosted/img/csgosas.png').default;
const csgot = require('../hosted/img/csgot.png').default;
const csgot2 = require('../hosted/img/csgot2.jpeg').default;

// Component for creating and submitting a post form
const PostForm = ({ onPost }) => {
    // Handles the submission of the post form
    const handlePost = async (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.querySelector('#title').value;
        const topic = form.querySelector('#topic').value;
        const content = form.querySelector('#contentArea').value;

        if (!title || !topic || !content) {
            helper.handleError('All fields are required!');
            return false;
        }

        const response = await helper.sendPost(form.action, { title, topic, content });

        if (response) {
            form.reset();
            onPost(response);
        }

        return false;
    };

    return (
        <form id="PostForm" action="/handlePost" onSubmit={handlePost} method="POST">
            <h1>Share Wisdom</h1>
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
            <div>
                <label>Content:</label>
                <textarea id="contentArea" name="content" placeholder="Write your post here..." rows="10"></textarea>
            </div>
            <div>
                <input className="formSubmit" type="submit" value="Post" />
            </div>
        </form>
    );
};

// Component for displaying a feed of posts
const PostFeed = ({ posts }) => {
    const [selectedTopic, setSelectedTopic] = React.useState('');

    // Filters posts based on the selected topic
    const filteredPosts = selectedTopic ? posts.filter(post => post.topic === selectedTopic) : posts;

    return (
        <div id="PostFeed">
            <label>Topics</label>
            <select onChange={e => setSelectedTopic(e.target.value)}>
                <option value="">None Specified</option>
                <option value="movement">Movement</option>
                <option value="map-strats">Map Strats</option>
                <option value="skins">Skins</option>
                <option value="gun-stats">Gun Stats</option>
            </select>
            {filteredPosts.map((post, index) => (
                <div key={index} id="individualPost">
                    <h2>{post.title + " - " + post.topic}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

// Main homepage component
const HomePage = () => {
    const images = [myImage, csgosas, csgot, csgot2];
    const [posts, setPosts] = React.useState([]);

    // Fetches posts from the server
    const fetchPosts = async () => {
        const response = await helper.sendGet('/getPosts');
        if (response && response.length > 0) {
            setPosts(response);
        } else {
            console.error('No posts found');
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    // Adds a new post to the state
    const handlePost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <div id="content">
            <AnimatedImages images={images} id="frame" />
            <div id="HomePage">
                <PostFeed posts={posts} />
                <PostForm onPost={handlePost} />
            </div>
        </div>
    );
};

// Component for displaying animated images
const AnimatedImages = ({ images }) => {
    const doubledImages = [...images, ...images, ...images];

    return (
        <div>
            {doubledImages.map((imagePath, index) => (
                <img
                    key={index}
                    src={imagePath}
                    className="animated-image"
                    style={{
                        width: `${Math.random() * 300 + 50}px`,
                        top: `${Math.random() * 60}vh`,
                        animationDelay: `${Math.random() * -10}s`,
                    }}
                />
            ))}
        </div>
    );
};

// Component for changing the user's password
const ChangePasswordForm = () => {
    const [username, setUsername] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    // Handles the password change submission
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!username || !oldPassword || !newPassword) {
            helper.handleError('Username, old password, and new password are required!');
            return false;
        }

        const response = await helper.sendPost('/changePassword', { username, oldPassword, newPassword });

        if (response) {
            helper.handleSuccess('Password changed successfully');
            setUsername('');
            setOldPassword('');
            setNewPassword('');
        }

        return false;
    };

    return (
        <form id="ChangePasswordForm" onSubmit={handleChangePassword}>
            <h1>Change Password</h1>
            <label>Username:</label>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <label>Old Password:</label>
            <input id="oldPassword" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            <label>New Password:</label>
            <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <div>
                <input className="formSubmit" type="submit" value="Change Password" />
            </div>
        </form>
    );
};

const init = () => {
    const changePassButton = document.getElementById('changePassword')
    const root = createRoot(document.getElementById('content'));

    changePassButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(
            <ChangePasswordForm />
        );
        return false;
    });

    root.render(
        <HomePage />
    )

    
}

// Assigns the init function to run when the window loads
window.onload = init;
