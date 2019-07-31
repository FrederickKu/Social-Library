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
 


  return {
    checkLogin,
    addUser
  };

};

