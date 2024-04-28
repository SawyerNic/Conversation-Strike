const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/loginPage', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout );
  app.post('/handleLogin', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/home',  mid.requiresLogin, controllers.Forum.mainPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
