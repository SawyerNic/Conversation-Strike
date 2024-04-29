const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

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

const WebsiteDescription = (props) => {
    return (
        <div>
            <p>This forum is for conversations about the game Counter Strike 2</p>
            <p>Posts may consist of but are not limited to: Movement Mechanics, Map Glitches, Gun Stats, Skins, etc.</p>
        </div>
    )
}

const LoginWindow = (props) => {
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

const SignupWindow = (props) => {
    return (
        <div>
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
        </div>
    );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(
            <LoginWindow />
        );
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('signupButton clicked');

        root.render(
            <>
                <div id="signupSection">
                    <WebsiteDescription />
                    <SignupWindow />
                </div>
            </>
        );
        return false;
    });

    root.render(<LoginWindow />);
};

window.onload = init;