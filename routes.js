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
  const booksControllerCallbacks = require('./controllers/book')(allModels);

  // Login + Register Routes
  app.get ('/',loginControllerCallbacks.login);
  app.post('/',loginControllerCallbacks.loginCheck);
  app.post('/register',loginControllerCallbacks.addUser);
  app.get('/home/:username',loginControllerCallbacks.home);

  app.get('/books', booksControllerCallbacks.getAllBooks);
  app.get('/books/:username')

}
