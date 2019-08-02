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
  const requestControllerCallbacks = require('./controllers/request')(allModels);


  // Login + Register Routes
  app.get ('/',loginControllerCallbacks.login);
  app.post('/',loginControllerCallbacks.loginCheck);
  app.post('/register',loginControllerCallbacks.addUser);
  app.get('/home/:username',loginControllerCallbacks.home);

  //book routes
  app.get('/books', booksControllerCallbacks.getAllBooks);
  app.get('/books/:id',booksControllerCallbacks.getIndividualBook);
  app.delete('/books/:id',booksControllerCallbacks.deleteIndividualBook);
  app.get('/books/:id/edit',booksControllerCallbacks.editIndividualBook);
  app.put('/books/:id/edit',booksControllerCallbacks.doEdit);

  //request routes
  app.post('/books/:id/request', requestControllerCallbacks.sendRequest);
  app.get('/request/:username', requestControllerCallbacks.getAllRequest);
  app.put('/request/:username/accept',requestControllerCallbacks.acceptRequest);
  app.put('/request/:username/reject',requestControllerCallbacks.rejectRequest);
  app.get('/request/:username/:id',requestControllerCallbacks.showRequestPage);
}
