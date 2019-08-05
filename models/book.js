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
  };

  let getIndividualBook = (callback,id)=> {
    let queryString = "SELECT * FROM (SELECT id AS user_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.user_id) WHERE books.id = $1";
    let values=[id];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
        if (error){
          console.log(error);
          callback(error,null);
        } else {
          let data = {
            book:queryResult.rows[0]
          }

          let queryString ="SELECT * FROM (SELECT id AS user_id, username FROM users) AS u INNER JOIN book_ownerhistory ON (u.user_id = book_ownerhistory.user_id) WHERE book_ownerhistory.book_id = $1 ORDER BY start_owned_date DESC";
          let values = [id];
          dbPoolInstance.query(queryString,values, (error, queryResult)=>{
            if (error) {
              console.log(error);
              callback(error,null);
            } else {
              data.ownerHistory = queryResult.rows;

              let queryString = "SELECT * FROM (SELECT id AS user_id, username FROM users) AS u INNER JOIN bookreviews ON (u.user_id = bookreviews.user_id) WHERE bookreviews.book_id = $1";
              let values = [id];

              dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                if (error){
                  console.log(error);
                  callback(error,null);
                } else {
                  data.bookReviews = queryResult.rows;
                  callback(null,data);
                }
              });
            }
          })
        }
    })
  }

  let doEdit =(callback,editDetails,id) => {
    let queryString = "UPDATE books SET book_title = $1, book_author=$2, book_synopsis=$3, book_image=$4 WHERE id=$5";
    let values = [editDetails.book_title,editDetails.book_author,editDetails.book_synopsis,editDetails.book_image,id];
    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error){
        console.log(error);
        callback(error);
      } else {
        callback(null);
      }

    });
  };

  let addBook =(callback,bookDetails,username) =>{
    let queryString = "SELECT id FROm users WHERE username =$1";
    let values =  [username];

    dbPoolInstance.query(queryString,values,(error,queryResult)=>{
      if (error){
        console.log(error);
        callback(error,null);
      } else {
        var userID = queryResult.rows[0].id;
        let queryString = "INSERT into books (book_title,book_author,book_synopsis,book_image,user_id,book_status) VALUES ($1,$2,$3,$4,$5,'available') RETURNING id";
        let values = [bookDetails.book_title,bookDetails.book_author,bookDetails.book_synopsis,bookDetails.book_image,userID];

        dbPoolInstance.query(queryString,values, (error,queryResult)=>{
          if (error){
            console.log(error);
            callback(error,null);
          } else {
            var bookID = queryResult.rows[0].id
            let queryString ="INSERT into book_ownerhistory (user_id, book_id) VALUES ($1,$2)";
            let values = [userID,bookID];

            dbPoolInstance.query(queryString,values,(error,queryResult)=>{
              if(error){
                console.log(error);
                callback(error,null);
              } else {
                callback (null,bookID)
              }
            })
          }
        })

      }
    })
  }

  let addReview = (callback,review,id,username) => {
    let queryString = "INSERT INTO bookreviews (user_id,book_id,book_review) VALUES ((SELECT id FROM users WHERE username = $1), $2, $3)";
    let values = [username,id,review];
  
    dbPoolInstance.query(queryString,values,(error,queryResult)=>{
      if(error){
        console.log(error);
        callback(error,null);
      } else{
        callback(null,id);
      }
    })
  } 



  let deleteIndividualBook = (callback,id) => {
    // let queryString = "SELECT username FROM (SELECT id AS user_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.user_id) WHERE books.id = $1";
    // let values=[id];

    // dbPoolInstance.query(queryString,values, (error,queryString)=>{
    //   if(error){
    //     console.log(error);
    //     callback(error,null);
    //   } else {
    //     var username = queryResult.rows[0];

    //     let queryString = ""
    //   }
    // })
  }
  return {
    getAllBooks,
    searchAllBooks,
    getIndividualBook,
    doEdit,
    deleteIndividualBook,
    addBook,
    addReview
  };

};

