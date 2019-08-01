const sha256=require('js-sha256');
const PSALT = 'sErceT pAsSwoRd adDiTioNaL pHraSe';


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  //getAllBooks
  let getAllBooks = (callback) => {
    let queryString = "SELECT * FROM (SELECT id AS user_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.user_id)";
    console.log(queryString);
    dbPoolInstance.query(queryString, (error,queryResult)=> {
      if (error) {
        console.log(error);
        callback(error,null);
      } else {
        callback(0,queryResult.rows);
      }
    });
  };

  let searchAllBooks = (callback, query) =>{
    let queryString = "SELECT * FROM (SELECT id AS user_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.user_id) WHERE books.book_title ILIKE $1";
    let values =['%'+query+'%'];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error){
        console.log(error)
        callback(error,null);
      } else {
        let result=(queryResult.rows.length>0) ? queryResult.rows : [];
        var data = {
            byTitle: result
        }

        let queryString = "SELECT * FROM (SELECT id AS user_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.user_id) WHERE books.book_author ILIKE $1";
        let values =['%'+query+'%'];

        dbPoolInstance.query(queryString,values, (error,queryResult)=>{
          if (error){
            console.log(error);
            callback(error,null);
          } else {
            let result=(queryResult.rows.length>0) ? queryResult.rows : [];
            data.byAuthor = result;
            callback(null,data);
          }
        })
      }
    })

  }

  return {
    getAllBooks,
    searchAllBooks
  };

};

