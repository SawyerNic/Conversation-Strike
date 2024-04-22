

const loginPage = (req, res) => res.render('login');

module.exports = {
  loginPage,
};

// const logout = (req, res) => {
//     req.session.destroy();
// }