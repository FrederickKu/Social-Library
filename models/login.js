const sha256=require('js-sha256');
const PSALT = 'sErceT pAsSwoRd adDiTioNaL pHraSe';


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  //Check Login Function
  let checkLogin = (callback, userDetails) =>{
    let queryString = "SELECT * FROM users WHERE username = $1";
    let values = [userDetails.username];
    dbPoolInstance.query(queryString,values, (error,queryResult)=> {
      if (error) {
        console.log(error);
        callback(error,0,null,null);
      } else {
        if (queryResult.rows.length>0){
          let passwordHash = sha256(userDetails.password + PSALT);
          if (passwordHash === queryResult.rows[0].password){
            callback(null,queryResult.rows[0].id,queryResult.rows[0].username,null);
          } else {
            callback(null,0,null,'password');
          } 
        } else {
          callback(null,0,null,'username');
        }
      }
    });
  };

  //Add User Function
  let addUser = (callback , userDetails) => {
    let queryString = "SELECT * FROM users WHERE username = $1";
    let values = [userDetails.username];
    dbPoolInstance.query(queryString, values, (error,queryResult) => {
      if (error) {
        console.log(error);
        callback (error,false);
      } else if (queryResult.rows.length === 0 ) {
        let passwordHash = sha256(userDetails.password + PSALT);
        let queryString = "INSERT into users (username,password,user_name,user_photo) VALUES ($1,$2,$3,$4) returning id";
        let values = [userDetails.username,passwordHash,userDetails.user_name,userDetails.user_photo];
        dbPoolInstance.query(queryString, values, (error,queryResult)=>{
          if (error){
            console.log(error);
            callback (error,false);
          } else {
            callback(null,true);
          }
        });
      } else {
        callback (null,false);
      }
    });
  };

  let getUserInfo = (callback,username,query) => {
    if (query === undefined){
      let queryString = "SELECT * FROM (SELECT id AS user_id, user_name,user_photo FROM users) AS u INNER JOIN books ON (u.user_id = books.user_id) WHERE books.user_id = (SELECT id FROM users WHERE username = $1)";
      let values = [username];

      dbPoolInstance.query(queryString,values,(error,queryResult)=>{
        if (error){
          console.log(error);
          callback(error,null);
        } else {
          let data = {
            username:username,
            name: queryResult.rows[0].user_name,
            photo:queryResult.rows[0].user_photo,
            books:queryResult.rows
          }
          callback(null,data);
        }
      })
    } else {
      let queryString = "SELECT * FROM (SELECT id AS user_id, user_name,user_photo FROM users) AS u INNER JOIN books ON (u.user_id = books.user_id) WHERE books.user_id = (SELECT id FROM users WHERE username = $1) AND books.book_title ILIKE $2";
      let values = [username,'%'+query+'%'];

      dbPoolInstance.query(queryString,values,(error,queryResult)=>{
        if (error){
          console.log(error);
          callback(error,null);
        } else {
          let result=(queryResult.rows.length>0) ? queryResult.rows : [];
          let data = {
            byTitle:result
          }

          let queryString = "SELECT * FROM (SELECT id AS user_id, user_name,user_photo FROM users) AS u INNER JOIN books ON (u.user_id = books.user_id) WHERE books.user_id = (SELECT id FROM users WHERE username = $1) AND books.book_author ILIKE $2";
          let values = [username,'%'+query+'%'];

          dbPoolInstance.query(queryString,values,(error,queryResult)=>{
            if (error){
              console.log(error);
              callback(error,null);
            } else {
              let result=(queryResult.rows.length>0) ? queryResult.rows : [];
              data.byAuthor=result;

              let queryString = "SELECT id, user_name, user_photo FROM users WHERE username = $1";
              let values = [username];
              dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                if (error) {
                  console.log(error);
                  callback(error,null);
                } else {
                  data.username=username;
                  data.name = queryResult.rows[0].user_name;
                  data.photo = queryResult.rows[0].user_photo;
                  callback(null,data);
                }
              })
            }
          })
        }    
      })

    }
  };


  return {
    checkLogin,
    addUser,
    getUserInfo
  };

};

