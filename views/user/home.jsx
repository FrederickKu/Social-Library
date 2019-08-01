var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');

class Home extends React.Component {
  render() {
    return (
    	<html>
	    	<HEAD>
	    		<title>Social Library: </title>
	    		<link rel={"stylesheet"} href={`/css/style.css`} />
	    	</HEAD>
	    	<BODY>
	    	<NAVBAR />

	    	</BODY>
        </html>   
    );
  }
}

module.exports = Home;