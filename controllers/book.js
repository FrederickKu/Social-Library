module.exports = (db) => {

  /**
   * ===========================================
   * Login Controllers
   * ===========================================
   */

  let getAllBooks = (request,response) => {

    if (Object.keys(request.query).length!==0) {
      let callback = function(error,data){
        if (error) {
          response.status(404);
        } else {
          data.searchStatus=true;
          data.username=request.cookies.woof;
          response.render('books/allbooks',data);
        }
      }
      db.books.searchAllBooks(callback,request.query.search)
    } else {
      let callback = function(error, allBooks){
        if (error){
          response.status(404);
        } else {
          let data = {
            books:allBooks,
            username:request.cookies.woof,
            searchStatus:false,
          }
          response.render('books/allbooks',data);
        }
      }
      db.books.getAllBooks(callback);
    }
  }


  let getIndividualBook = (request,response) => {
    let callback = function(error,data) {
      if (error){
          response.status(404);
        } else {
          data.username=request.cookies.woof;
          if (data.book.username === request.cookies.woof){
            data.ownership=true;
          } else {
            data.ownership=false;
          }

          response.render('books/individualbook',data);
        }
    }

    db.books.getIndividualBook(callback,request.params.id);
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
    deleteIndividualBook:deleteIndividualBook
  };

}
