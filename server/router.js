const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/loginPage', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout );
  app.post('/handleLogin', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/handlePost', mid.requiresSecure, mid.requiresLogin, controllers.Forum.post);
  app.get('/getPosts', mid.requiresSecure, mid.requiresLogin, controllers.Forum.getPosts);
  app.get('/home',  mid.requiresLogin, controllers.Forum.mainPage);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.use('*', (req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;
