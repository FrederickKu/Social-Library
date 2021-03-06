/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



const pg = require('pg');
const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{
  configs = {
    user: 'postgres',
    password:'N3v3rforg3t@',
    host: '127.0.0.1',
    database: 'social_library',
    port: 5432
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});



/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


const allloginModelsFunction = require('./models/login');
const loginModelsObject = allloginModelsFunction( pool );

const allBooksModelsFunction = require('./models/book');
const booksModelsObject = allBooksModelsFunction( pool );

const allRequestsModelsFunction = require('./models/request');
const requestsModelsObject = allRequestsModelsFunction( pool );


/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
  // get a reference to end the connection pool at server end
  // queryInterface: (text, params, callback) => {
  //   return pool.query(text, params, callback);
  // },
  pool:pool,


  /*
   * ADD APP MODELS HERE
   */
  login: loginModelsObject,
  books: booksModelsObject,
  request: requestsModelsObject
};
