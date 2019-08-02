var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Allrequest extends React.Component {
  render() {
  		let peopleRequests = this.props.peoplesRequest.map(request=>{

	  		if (request.swap_status === 'pending_accept'){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.recipient_username}| {request.swap_status}</p>
	  					<form method={'POST'} action={'/request/'+this.props.username+'/accept?_method=PUT'}>
	  						<input type={"hidden"} name={"request"} defaultValue={request.id} />
	  						<button type={'submit'}>Accept Request</button>
	  					</form>
	  					<form method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  						<input type={"hidden"} name={"request"} defaultValue={request.id} />
	  						<button type={'submit'}>Reject Request</button>
	  					</form>
	  					</div>
	  				);
	  		} else if (request.swap_status === "pending_swap"){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.recipient_username}| {request.swap_status}</p>
	  					<a href={'/request/'+this.props.username+'/'+request.id}><button>Go to Request</button></a>
	  					</div>
	  				);
	  		} else if(request.swap_status === "cancelled"){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.recipient_username}| {request.swap_status}</p>
	  					<p> Request cancelled</p>
	  					</div>
	  			);
	  		}
  		});

  		let myRequests = this.props.myRequest.map(request=>{

	  		if (request.swap_status === 'pending_accept'){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.owner_username}| {request.swap_status}</p>
	  					<p>Pending Accept</p>
	  					</div>
	  				);
	  		} else if (request.swap_status === "pending_swap"){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.recipient_username}| {request.swap_status}</p>
	  					<a href={'/request/'+this.props.username+'/'+request.id}><button>Go to Request</button></a>
	  					</div>
	  				);
	  		} else if(request.swap_status === "cancelled"){
	  			return(<div>
	  					<p>{request.book_title}|{request.book_author}|{request.recipient_username}| {request.swap_status}</p>
	  					<p> Request cancelled</p>
	  					</div>
	  			);
	  		}
  		});

	  	return (
	    	<html>
		    	<HEAD>
		    		<title>Social Library: The Exchange </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>
		    	<BODY>
		    		<NAVBAR username={this.props.username} />
		    		<div className = {'container-fluid'} >
		    			<h2> People's Request</h2>
		    			{peopleRequests}
		    			<h2> My Request</h2>
		    			{myRequests}
		    		</div>
		    	</BODY>
	        </html>   
    	);
	}
  }

module.exports = Allrequest;