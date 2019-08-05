const sha256=require('js-sha256');
const SALT = 'ThIs is ThE SecrEt pHrasE.';

module.exports = (db) => {

  /**
   * ===========================================
   * Book Controllers
   * ===========================================
   */

  let checkSession=(username, session) =>{
    let sessionCookie = sha256(`true` + SALT + username);
    if (sessionCookie === session){
      return true;
    } else {
      return false;
    }
  }


  let getAllBooks = (request,response) => {
    if ('woof' in request.cookies && 'meow' in request.cookies){
      if (checkSession(request.cookies.woof,request.cookies.meow)){
          if (Object.keys(request.query).length!==0) {
            let callback = function(error,data){
              if (error) {
                response.status(404);
              } else {
                data.searchStatus=true;
                response.render('books/allbooks',data);
              }
            }
            db.books.searchAllBooks(callback,request.query.search)
          } else {
            let callback = function(error, allBooks, userDetails){
              if (error){
                response.status(404);
              } else {
                let data = {
                  books:allBooks,
                  user: userDetails,
                  searchStatus:false,
                }
                response.render('books/allbooks',data);
              }
            }
            db.books.getAllBooks(callback,request.cookies.woof);
          }
      } else {
        response.redirect('/');
      }
    } else {
      response.redirect('/');
    }
  }


  let getIndividualBook = (request,response) => {
    if ('woof' in request.cookies && 'meow' in request.cookies){
      if (checkSession(request.cookies.woof,request.cookies.meow)){
        let callback = function(error,data) {
          if (error){
              response.status(404);
            } else {
              if (data.book.username === request.cookies.woof){
                data.ownership=true;
              } else {
                data.ownership=false;
              }

              response.render('books/individualbook',data);
            }
        }

        db.books.getIndividualBook(callback,request.params.id,request.cookies.woof);
      } else {
        response.redirect('/');
      }
    } else {
      response.redirect('/');
    }
  }

  let editIndividualBook = (request,response) => {
    let callback = function(error,data) {
      if(error){
        response.status(404);
      } else {
        response.render('books/editbook',data);
      }
    }
    db.books.getIndividualBook(callback,request.params.id);
  }

  let doEdit = (request,response) => {
    let callback = function(error){
      if (error){
        response.status(404);
      } else {
        response.redirect('/books/'+request.params.id);
      }
    }
    db.books.doEdit(callback,request.body,request.params.id);
  }

  let deleteIndividualBook = (request,response) => {
    let callback = function(error,username){
      if (error) {
        response.status(404);
      } else{
        response.redirect('/home/'+username);
      }
    }
    db.books.deleteIndividualBook(callback,request.params.id);
  }

  let displayAddPage = (request,response) => {

    if ('woof' in request.cookies && 'meow' in request.cookies){
      if (checkSession(request.cookies.woof,request.cookies.meow)){
          let callback = (error,userDetails) => {
            if (error) {
              response.status(404);
            } else {
              response.render('books/addbook',userDetails)
            }
          }
          db.books.getUserDetails(callback,request.cookies.woof);
      } else {
        response.redirect('/');
      }
    } else {
      response.redirect('/');
    }
  }

  let addBook = (request,response) => {
    let callback = (error,bookID) =>{
      if (error){
        response.status(404);
      } else {
        response.redirect('/books/'+bookID);
      }
    }
    db.books.addBook(callback,request.body,request.cookies.woof);
  }

  let addReview = (request,response) =>{
    let callback = (error, bookID) =>{
      if (error){
        response.status(404);
      } else {
        response.redirect('/books/'+bookID);
      }
    }
    db.books.addReview(callback,request.body.book_review,request.params.id,request.cookies.woof);
  }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getAllBooks:getAllBooks,
    getIndividualBook:getIndividualBook,
    editIndividualBook:editIndividualBook,
    doEdit: doEdit,
    deleteIndividualBook:deleteIndividualBook,
    displayAddPage:displayAddPage,
    addBook:addBook,
    addReview:addReview
  };

}
