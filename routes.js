module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *         ALL ROUTES FOR CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const loginControllerCallbacks = require('./controllers/login')(allModels);
  const userControllerCallbacks = require('./controllers/user')(allModels);


  // Login + Register Routes
  app.get ('/',loginControllerCallbacks.login);
  app.post('/',loginControllerCallbacks.loginCheck);
  app.post('/register',loginControllerCallbacks.addUser);
  app.get('/home/:username',loginControllerCallbacks.home)

}
