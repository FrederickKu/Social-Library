/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let getAllRequest = (callback,username) => {
    let queryString = "SELECT * FROM ((SELECT * FROM (SELECT id as owner_id, username FROM users) as u INNER JOIN swap ON (u.owner_id = swap.owner_id) WHERE u.owner_id = (SELECT id FROM users WHERE username = $1)) AS owner_swap INNER JOIN (SELECT id AS book_id, book_title, book_author, book_image, user_id AS owner_id, book_status FROM books) AS book_details ON (owner_swap.book_id=book_details.book_id)) AS get_recipient INNER JOIN (SELECT id AS recipient_id, username AS recipient_username FROM users) AS recipient ON (get_recipient.recipient_id = recipient.recipient_id) ORDER BY request_timestamp DESC";
    let values = [username];
    dbPoolInstance.query(queryString,values,(error,queryResult)=>{
      if(error){
        console.log(error);
        callback(error,false);
      } else {
        let result = (queryResult.rows.length>0) ? queryResult.rows : [];
        let data = {
          peoplesRequest: result
        };

        let queryString = "SELECT * FROM ((SELECT * FROM (SELECT id as recipient_id, username FROM users) as u INNER JOIN swap ON (u.recipient_id = swap.recipient_id) WHERE u.recipient_id = (SELECT id FROM users WHERE username = $1)) AS owner_swap INNER JOIN (SELECT id AS book_id, book_title,book_author, book_image, user_id AS owners_id FROM books) AS  book_details ON (owner_swap.book_id=book_details.book_id)) AS get_owner INNER JOIN (SELECT id AS owner_id, username AS owner_username FROM users) AS owner_details ON (get_owner.owner_id = owner_details.owner_id) ORDER BY request_timestamp DESC";
        let values = [username];
        dbPoolInstance.query(queryString,values,(error,queryResult)=>{
          if(error){
            console.log(error);
            callback(error,false);
          } else {
            let result = (queryResult.rows.length>0) ? queryResult.rows : [];
            data.myRequest=result;

            let queryString = "SELECT id, username, user_name, user_photo FROM users WHERE username = $1";
            let values = [username];

            dbPoolInstance.query(queryString,values,(error,queryResult)=>{
              if(error){
                console.log(error);
                callback(error,false);
              } else {
                data.userDetails = queryResult.rows[0];

                let queryString = "SELECT * FROM (SELECT * FROM (SELECT id AS request_id, owner_id, recipient_id,  swap_status, book_id FROM swap WHERE owner_id = (SELECT id FROM users WHERE username = $1) AND swap_status='pending_accept') as requestDetails INNER JOIN books ON (requestDetails.book_id = books.id)) AS swapBook INNER JOIN (SELECT id AS recipient_id, username FROM users) AS recipientDetails ON (swapBook.recipient_id = recipientDetails.recipient_id)";
                let values = [username];

                dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                    if(error){
                      console.log(error);
                      callback(error,null);
                    } else {
                      let result=(queryResult.rows.length>0) ? queryResult.rows : [];
                      data.pending = result;
                      callback(null,data);
                    }
                });
              }
            })
          }
        });
      }  
    });
  };


  let sendRequest = (callback, username, book_id) =>{
    let queryString = "SELECT * FROM (SELECT id AS users_id , username FROM users) AS username INNER JOIN books ON (books.user_id = username.users_id) WHERE books.id = $1";
    let values=[book_id];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error) {
        console.log(error);
        callback(error,false);
      } else {
        console.log(queryResult.rows);
        if (queryResult.rows[0].book_status ==='available') {
          var owner_id = queryResult.rows[0].user_id;

          let queryString="SELECT id FROM users WHERE username = $1";
          let values=[username];

          dbPoolInstance.query(queryString,values, (error,queryResult)=>{
            if (error) {
              console.log(error);
              callback(error,false);
            } else {
              let queryString="INSERT INTO SWAP (owner_id,recipient_id,swap_status,book_id) VALUES ($1,$2,'pending_accept',$3)";
              let values = [owner_id,queryResult.rows[0].id,book_id];

              dbPoolInstance.query(queryString,values, (error,queryResult)=>{
                if (error) {
                  console.log('1'+error);
                  callback(error,false);
                } else {
                  let queryString = "UPDATE books SET book_status = 'pending_swap' WHERE id = $1";
                  let values = [book_id];

                  dbPoolInstance.query (queryString,values,(error,queryResult)=>{
                    if(error){
                      console.log('2'+error);
                      callback(error,false);
                    } else {
                      callback(null,true);
                    }
                  })
                }
              });
            }
          });
          } else {
            callback(null,false);
          }
      }
  });
};

  let acceptRequest = (callback,request_id) =>{
    let queryString = "UPDATE swap SET swap_status = 'pending_swap' WHERE id = $1";
    let values = [parseInt(request_id)];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if(error){
        console.log(error);
        callback(error);
      } else {
        callback(null);
      }
    });
  }

  let rejectRequest = (callback,request_id) =>{
    let queryString = "UPDATE swap SET swap_status = 'cancelled' WHERE id = $1 RETURNING book_id";

    let values = [parseInt(request_id)];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if(error){
        console.log(error);
        callback(error);
      } else {
        let queryString = "UPDATE books SET book_status = 'available' WHERE id = $1";
        let values = [queryResult.rows[0].book_id];

        dbPoolInstance.query(queryString,values, (error, queryResult)=>{
          if(error){
            console.log(error);
            callback(error);
          } else {
             callback(null);
          }
        })
      }
    });
  }

  let showRequestPage = (callback,username,request_id) => {
    //Check if owner
    var request_id=parseInt(request_id);
    let queryString = "SELECT owner_id , username, user_name, user_photo FROM (SELECT * FROM swap WHERE id = $1) AS request INNER JOIN users ON (request.owner_id = users.id) WHERE users.username = $2";
    let values = [request_id,username];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error){
        console.log(error);
        callback(error,null,null);
      } else if (queryResult.rows.length>0){
        //owner of book of request
          var data = {
              ownerDetail: queryResult.rows[0],
              userDetails: queryResult.rows[0]
          }

          let queryString="SELECT * FROM (SELECT * FROM swap WHERE id = $1) AS request INNER JOIN (SELECT id AS book_id, book_title, book_author, book_synopsis, book_image, user_id as owner_id FROM books) AS book_details ON (request.book_id = book_details.book_id)";
          let values = [request_id];

          dbPoolInstance.query(queryString,values, (error,queryResult)=>{
            if (error){
              console.log(error);
              callback(error,null,null);
            } else {
              data.requestBookDetail = queryResult.rows[0];
              let queryString = "SELECT recipient_id,username,user_name,user_photo FROM (SELECT * FROM swap where id=$1) AS request INNER JOIN users on (request.recipient_id=users.id)";
              let values = [request_id];

              dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                if (error){
                  console.log(error);
                  callback(error,null,null);
                } else {
                  data.recipientDetails = queryResult.rows[0];

                  let queryString = "SELECT * FROM (SELECT * FROM (SELECT id AS request_id, owner_id, recipient_id,  swap_status, book_id FROM swap WHERE owner_id = (SELECT id FROM users WHERE username = $1) AND swap_status='pending_accept') as requestDetails INNER JOIN books ON (requestDetails.book_id = books.id)) AS swapBook INNER JOIN (SELECT id AS recipient_id, username FROM users) AS recipientDetails ON (swapBook.recipient_id = recipientDetails.recipient_id)";
                  let values = [username];

                  dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                      if(error){
                        console.log(error);
                        callback(error,null,null);
                      } else {
                        let result=(queryResult.rows.length>0) ? queryResult.rows : [];
                        data.pending = result;
                        callback (null,true,data);
                      }
                  });      
                }
              })
            }
          });
      } else {
        //not owner of book of request
          let queryString="SELECT recipient_id,username,user_name,user_photo FROM (SELECT * FROM swap WHERE id = $1) AS request INNER JOIN users ON (request.recipient_id = users.id) WHERE users.username=$2";
          let values =[request_id,username];

          dbPoolInstance.query(queryString,values,(error,queryResult)=>{
            if (error){
              console.log('1'+error);
              callback(error,null,null);
            } else if(queryResult.rows.length>0) {
              //recipient of book request
              var data = {
                recipientDetails: queryResult.rows[0],
                userDetails: queryResult.rows[0]
              }

              let queryString = "SELECT owner_id, username,user_name,user_photo FROM (SELECT * FROM swap where id = $1) AS request INNER JOIN users ON (request.owner_id=users.id)";
              let values = [request_id];

              dbPoolInstance.query(queryString,values, (error,queryResult)=>{
                if (error){
                  console.log('2'+error);
                  callback(error,null,null);
                } else {
                  data.ownerDetail=queryResult.rows[0];

                  let queryString="SELECT * FROM (SELECT * FROM swap WHERE id = $1) AS request INNER JOIN (SELECT id AS book_id, book_title, book_author, book_synopsis, book_image, user_id as owner_id FROM books) AS book_details ON (request.book_id = book_details.book_id)";
                  let values = [request_id];

                  dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                    if(error){
                      console.log(error);
                      callback(error,null,null);
                    } else {
                      data.requestBookDetail=queryResult.rows[0];

                      let queryString = "SELECT * FROM (SELECT * FROM (SELECT id AS request_id, owner_id, recipient_id,  swap_status, book_id FROM swap WHERE owner_id = (SELECT id FROM users WHERE username = $1) AND swap_status='pending_accept') as requestDetails INNER JOIN books ON (requestDetails.book_id = books.id)) AS swapBook INNER JOIN (SELECT id AS recipient_id, username FROM users) AS recipientDetails ON (swapBook.recipient_id = recipientDetails.recipient_id)";
                      let values = [username];

                      dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                          if(error){
                            console.log(error);
                            callback(error,null,null);
                          } else {
                            let result=(queryResult.rows.length>0) ? queryResult.rows : [];
                            data.pending = result;
                            callback (null,true,data);
                          }
                      });   
                    }
                  })
                }
              })
            } else {
              callback(null,false,null);
            }
          });
        }
    });
  }

  let confirmSwap = function(callback,username,request_id) {
    var request_id=parseInt(request_id);
    let queryString = "SELECT owner_id , username, user_name, user_photo FROM (SELECT * FROM swap WHERE id = $1) AS request INNER JOIN users ON (request.owner_id = users.id) WHERE users.username = $2";
    let values = [request_id,username];

    dbPoolInstance.query(queryString,values, (error,queryResult)=>{
      if (error) {
        console.log(error);
        callback(error);
      } else if (queryResult.rows.length>0) {
          //is owner
          let queryString ='UPDATE swap SET owner_handshake = TRUE WHERE id=$1 RETURNING *';
          let values= [request_id]; 

          dbPoolInstance.query(queryString,values,(error,queryResult)=>{
            if (error) {
              console.log(error);
              callback(error);
            } else {
              if (queryResult.rows[0].recipient_handshake){
                let queryString = "UPDATE swap SET swap_status = 'completed' WHERE id = $1 RETURNING *;"
                let values = [request_id];
                dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                  if (error) {
                    console.log(error);
                    callback(error);
                  }else {
                    //handshake done update book ownership
                    let queryString = "UPDATE books SET user_id = $1, book_status = 'available' WHERE id= $2 RETURNING *;"
                    let values = [queryResult.rows[0].recipient_id,queryResult.rows[0].book_id];

                    dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                      if(error) {
                        console.log(error);
                        callback(error);
                      } else {
                        //update ownerhistory
                        let queryString ="INSERT INTO book_ownerhistory (user_id,book_id) VALUES ($1,$2)";
                        let values = [queryResult.rows[0].user_id,queryResult.rows[0].id];
                        dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                          if(error){
                            console.log(error);
                            callback(error);
                          } else {
                            callback(null);
                          }
                        });
                      }
                    });
                  }
                });
              } else{
                callback(null);
              }
            }
          });

      } else {
          //is not owner
          let queryString = 'UPDATE swap SET recipient_handshake = TRUE WHERE id=$1 RETURNING *';
          let values = [request_id];

          dbPoolInstance.query(queryString,values,(error,queryResult)=>{
            if (error){
              console.log(error);
              callback(error);
            } else {
              if (queryResult.rows[0].owner_handshake){
                let queryString = "UPDATE swap SET swap_status = 'completed' WHERE id = $1 RETURNING *;"
                let values = [request_id];
                dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                  if (error) {
                    console.log(error);
                    callback(error);
                  }else {
                //handshake done update book ownership
                    let queryString = "UPDATE books SET user_id = $1, book_status = 'available' WHERE id= $2 RETURNING *;"
                    let values = [queryResult.rows[0].recipient_id,queryResult.rows[0].book_id];

                    dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                      if(error) {
                        console.log(error);
                        callback(error);
                      } else {
                        //update ownerhistory
                        let queryString ="INSERT INTO book_ownerhistory (user_id,book_id) VALUES ($1,$2)";
                        let values = [queryResult.rows[0].user_id,queryResult.rows[0].id];
                        dbPoolInstance.query(queryString,values,(error,queryResult)=>{
                          if(error){
                            console.log(error);
                            callback(error);
                          } else {
                            callback(null);
                          }
                        });
                      }
                    });
                  }
                });
              } else{
                callback(null);
              }              
            }
          });
      }
    });
  }

  return {
    getAllRequest,
    sendRequest,
    acceptRequest,
    rejectRequest,
    showRequestPage,
    confirmSwap
  };

};

