const sha256=require('js-sha256');
const PSALT = 'sErceT pAsSwoRd adDiTioNaL pHraSe';


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let showHome = (callback,username, cookieusername) => {

    let queryString = "(SELECT username FROM users INNER JOIN users_followers ON (users_followers.follower_id = users.id) where users_followers.user_id = (SELECT id FROM users where username = $1)) UNION (SELECT USERNAME FROM users INNER JOIN users_followers ON (users_followers.user_id = users.id) where users_followers.follower_id = (SELECT id FROM users where username = $2))";
    let values = [cookieusername,cookieusername];
    console.log(username);
    console.log(cookieusername);
    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error) {
        console.log('error1');
        callback(error,null,false);
      } else if (username === cookieusername || queryResult.rows.find(user => user.username===username)){
        let queryString = "SELECT * FROM (SELECT id AS user_id, username, name, photo,age FROM users) AS u LEFT JOIN tweeds ON (tweeds.user_id = u.user_id) WHERE u.user_id = (SELECT id FROM users WHERE username = $1) ORDER BY updated_at DESC LIMIT 5";
        let values = [username];
        dbPoolInstance.query(queryString,values,(error,queryResult)=> {
          if (error){
            console.log('error2');
            callback (error,null,false);
          } else {
            let data = {
              tweeds: queryResult.rows
            }
            let queryString = "SELECT username FROM users INNER JOIN users_followers ON (users_followers.follower_id = users.id) where users_followers.user_id = (SELECT id FROM users where username = $1)";
            let values = [username];

            dbPoolInstance.query(queryString,values, (error,queryResult)=>{
                if (error) {
                  callback(error,null,false);
                } else {
                  data.followers = queryResult.rows;
                  callback(null,data,true);
                }
            });

          }
      });      

      } else {
        callback(error,null,false);
      }

    });



  };

  let addTweed = (callback,username,tweed) => {
    let queryString = 'INSERT INTO tweeds (user_id, tweed, created_at, updated_at) VALUES ((SELECT id FROM users where username = $1), $2, current_timestamp, current_timestamp)';
    let values = [username,tweed];

    dbPoolInstance.query(queryString,values,(error,queryResult)=> {
      callback(error);
    });
  };

  let allTweeds = (callback,username) => {
    let queryString = 'SELECT * FROM tweeds where user_id = (SELECT id FROM users WHERE username = $1) ORDER BY updated_at DESC';
    let values = [username];

    dbPoolInstance.query(queryString,values,(error,queryResult)=> {
      if (error) {
        callback(error,null);
      } else {
        callback(null,queryResult.rows);
      }
    });

  };

  return {
    showHome,
    addTweed,
    allTweeds
  };

};


