const sha256=require('js-sha256');
const SALT = 'ThIs is ThE SecrEt pHrasE.';


module.exports = (db) => {

  /**
   * ===========================================
   * User Controllers
   * ===========================================
   */

  let displayHomePage = (request,response) => {
    let callback = function(error,result,allowed){
      if (error) {
        response.send(error);
      } else if (allowed) { 
        response.render('user/home',result);
      } else{
        response.send('you did not follow this person!');
      }
    }
    db.users.showHome(callback,request.params.username,request.cookies.woof);
  }

  let addTweed = (request, response) => {
    let callback = function(error){
      if (error) {
        response.send(error);
      } else {
        response.redirect('/home/'+request.params.username);
      }
    }

    db.users.addTweed(callback,request.params.username,request.body.tweed);
  }

  let allTweeds = (request,response) => {
    let callback = function(error,result) {
      if (error) {
        response.send(error);
      } else {
        let data = {
          tweeds:result,
          username:request.params.username
        }
        response.render('user/alltweed', data);
      }

    }

    db.users.allTweeds(callback,request.params.username);
  }


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home: displayHomePage,
    addTweed: addTweed,
    allTweeds: allTweeds
  };

}
