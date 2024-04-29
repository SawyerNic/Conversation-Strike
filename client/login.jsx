const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

// Handles the login form submission
const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });
    return false;
};

// Handles the signup form submission
const handleSignup = (e) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });
    return false;
};

// Displays a description of the website
const WebsiteDescription = () => {
    return (
        <div>
            <p>This forum is for conversations about the game Counter Strike 2.</p>
            <p>Posts may consist of but are not limited to: Movement Mechanics, Map Glitches, Gun Stats, Skins, etc.</p>
        </div>
    );
};

// Renders the login window form
const LoginWindow = () => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/handleLogin"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

// Renders the signup window form
const SignupWindow = () => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Confirm Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
};

// Initializes the application and sets up event listeners for login and signup buttons
const init = () => {
    const root = createRoot(document.getElementById('content'));

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(
            <div id="signupSection">
                <WebsiteDescription />
                <SignupWindow />
            </div>
        );
        return false;
    });

    // Renders the LoginWindow by default
    root.render(<LoginWindow />);
};

// Attaches the init function to window.onload to ensure it runs when the page is fully loaded
window.onload = init;
