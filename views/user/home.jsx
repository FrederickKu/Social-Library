var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');

class Login extends React.Component {
  render() {
    return (
    	<html>
	    	<HEAD>
	    		<title>Social Library: </title>
	    	</HEAD>
	    	<BODY>
	    	<NAVBAR />

	        </BODY>
        </html>   
    );
  }
}

module.exports = Login;