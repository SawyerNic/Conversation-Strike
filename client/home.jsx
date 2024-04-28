const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');
const { Link } = require('react-router-dom');


const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/loginPage">Go to Login</Link>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));

    root.render(<HomePage />);
}

window.onload = init()