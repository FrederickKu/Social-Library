module.exports = (db) => {

  /**
   * ===========================================
   * Login Controllers
   * ===========================================
   */

  let getAllRequest = (request,response) => {
    let callback = function(error,data) {
      if (error){
        response.sendStatus(404);
      } else {
        data.username=request.params.username;
        response.render('request/allrequest',data);
      }
    }
    db.request.getAllRequest(callback,request.params.username);
  }

  let sendRequest = (request,response) => {
    let callback = function(error,success) {
      if (error){
        response.sendStatus(404);
      } else {
        if(success){
          response.redirect('/request/'+request.cookies.woof);
        } else {
          response.redirect('/books/'+request.params.id);
        }
      }
    }

    db.request.sendRequest(callback,request.cookies.woof,request.params.id);
  }

  let acceptRequest = (request,response) => {
    let callback=function(error){
      if(error){
        response.sendStatus(404);
      } else {
        response.redirect('/request/'+request.params.username);
      }

    }

    db.request.acceptRequest(callback, request.body.request)
  }

  let rejectRequest = (request,response) => {
    let callback=function(error){
      if(error){
        response.sendStatus(404);
      } else {
        response.redirect('/request/'+request.params.username);
      }
    }

    db.request.rejectRequest(callback,request.body.request);
  }

  let showRequestPage =(request,response)=>{
    let callback=function(error,authenticate,data){
      console.log(data);
      if (error){
        response.sendStatus(404);
      } else if (authenticate){
        data.username=request.params.username;
        data.requestid=request.params.id;
        response.render('request/request',data);
      } else {
        response.redirect('/home/'+request.cookies.woof);
      }
    }

    db.request.showRequestPage(callback,request.params.username,request.params.id);
  }

  let confirmSwap = (request,response) =>{
    let callback=function(error) {
      if (error){
        response.sendStatus(404);
      } else {
        response.redirect('/request/'+request.params.username+'/'+request.params.id);
      }
      
    }
    db.request.confirmSwap(callback,request.params.username,request.params.id);
  }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getAllRequest:getAllRequest,
    sendRequest:sendRequest,
    acceptRequest:acceptRequest,
    rejectRequest:rejectRequest,
    showRequestPage:showRequestPage,
    confirmSwap:confirmSwap
  };

}
