// Import the models module, which includes the Account model for database operations
const models = require('../models');
const { Account } = models;

// Renders the login page
const loginPage = (req, res) => res.render('loginPage');

// Terminates the user session and redirects to the home page
const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

// Authenticates a user by their username and password
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  // Checks if both username and password are provided
  if (!username || !pass) {
    return res.status(400).send('Username and password are required');
  }

  // Uses the Account model to authenticate the user
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // Stores the user's account information in the session
    req.session.account = Account.toAPI(account);

    // Redirects to the home page upon successful authentication
    return res.json({ redirect: '/home' });
  });
};

// Registers a new user account
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // Validates the required fields
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Checks if the passwords match
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Generates a hash for the password and creates a new account
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();

    // Stores the new account information in the session
    req.session.account = Account.toAPI(newAccount);

    // Redirects to the home page upon successful account creation
    return res.json({ redirect: '/home' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// Changes the password for an existing user account
const changePassword = async (req, res) => {
    const username = `${req.body.username}`;
    const oldPassword = `${req.body.oldPassword}`;
    const newPassword = `${req.body.newPassword}`;

    // Validates the required fields
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new password are required' });
    }

    try {
        // Changes the user's password using the Account model
        await Account.changePassword(username, oldPassword, newPassword);
        return res.json({ success: 'Password changed successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

// Exports the functions to be used in other parts of the application
module.exports = {
    loginPage,
    logout,
    login,
    signup,
    changePassword,
};
