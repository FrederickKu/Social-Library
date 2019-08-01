module.exports = (db) => {

  /**
   * ===========================================
   * Login Controllers
   * ===========================================
   */

  let getAllBooks = (request,response) => {

    console.log(request.query);

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




  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getAllBooks:getAllBooks
  };

}
