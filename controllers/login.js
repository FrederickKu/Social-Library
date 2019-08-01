const sha256=require('js-sha256');
const SALT = 'ThIs is ThE SecrEt pHrasE.';


module.exports = (db) => {

  /**
   * ===========================================
   * Login Controllers
   * ===========================================
   */

  let displayLoginPage = (request,response) =>{
      response.render('login/login');
  }

  let checkLogin = (request,response) => {
      let callback = function(error, id, user,loginError) {
        if(error){
          response.status(404);
        } else if (id>0 && loginError===null) {
          let sessionCookie = sha256(`true` + SALT + user);

          response.cookie('meow',sessionCookie);
          response.cookie('woof',user);
          response.redirect('/home/' + user);
        }else if (loginError){
          let data = {
            error:loginError
          }
          response.render('login/login',data);
        }
      }
      db.login.checkLogin(callback,request.body);

  }

  let addUser = (request,response) => {
        let callback = function (error,success) {
          if (error){
            response.status(404);
          } else if (success) {
            response.sendStatus(200);
          } else {
            response.sendStatus(400);
          }
        };

        db.login.addUser(callback,request.body);
  };


  let displayHomePage = (request,response) => {

    if (Object.keys(request.query).length!==0) {
      let callback = function(error,data){
        if (error) {
          response.status(404);
        } else {
          data.searchStatus=true;
          console.log(data);

          response.render('user/home',data);
        }
      }

      db.login.getUserInfo(callback,request.params.username,request.query.search);
    } else {
      let callback = function(error, data){
        if (error){
          response.status(404);
        } else {
          data.searchStatus=false;
          response.render('user/home',data);
        }
      }
      
      db.login.getUserInfo(callback,request.params.username);
    }
}


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    login: displayLoginPage,
    loginCheck: checkLogin,
    addUser:addUser,
    home: displayHomePage
  };

}
