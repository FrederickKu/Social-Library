var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Allrequest extends React.Component {
  render() {
  		let peopleRequests = this.props.peoplesRequest.map((request,index)=>{

	  		if (request.swap_status === 'pending_accept'){
	  			return( <tr>
							<th className={'align-middle'} scope={"row"}>{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.recipient_username}</td>
							<td className={"align-middle"}>Pending Accept</td>
							<td className={"align-middle"}>
								<form method={'POST'} action={'/request/'+this.props.username+'/accept?_method=PUT'}>
	  								<input type={"hidden"} name={"request"} defaultValue={request.id} />
	  								<button className={'btn btn-dark'} type={'submit'}>Accept Request</button>
	  							</form><br /> 
	  							<form method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  								<input type={"hidden"} name={"request"} defaultValue={request.id} />
	  								<button className={'btn btn-light'} type={'submit'}>Reject Request</button>
	  							</form>
	  						</td>
						</tr>
	  				);
	  		} else if (request.swap_status === "pending_swap"){
	  			return( <tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.recipient_username}</td>
							<td className={"align-middle"}>Pending Swap</td>
							<td className={"align-middle"}>
								<a href={'/request/'+this.props.username+'/'+request.id}><button className={'btn btn-dark'}>Go to Request</button></a>
	  						</td>
						</tr>
	  				);
	  		} else if(request.swap_status === "cancelled"){
	  			return(<tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.recipient_username}</td>
							<td className={"align-middle"}>Request Cancelled</td>
							<td className={"align-middle"}>-</td>
						</tr>
	  			);
	  		} else if (request.swap_status === "completed") {
	  			return( <tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.recipient_username}</td>
							<td className={"align-middle"}>Completed</td>
							<td className={"align-middle"}>
								<a href={'/request/'+this.props.username+'/'+request.id}><button className={'btn btn-dark'}>Go to Request</button></a>
	  						</td>
						</tr>
	  				);
	  		}
  		});

  		let myRequests = this.props.myRequest.map((request,index)=>{

	  		if (request.swap_status === 'pending_accept'){
	  			return( <tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.owner_username}</td>
							<td className={"align-middle"}>Pending Accept</td>
							<td className={"align-middle"}>-</td>
						</tr>
	  				);
	  		} else if (request.swap_status === "pending_swap"){
	  			return( <tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.owner_username}</td>
							<td className={"align-middle"}>Pending Swap</td>
							<td className={"align-middle"}>
			  					<a href={'/request/'+this.props.username+'/'+request.id}><button className={'btn btn-dark'}>Go to Request</button></a>
							</td>
						</tr>
	  				);
	  		} else if(request.swap_status === "cancelled"){
	  			return(<tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.owner_username}</td>
							<td className={"align-middle"}>Request Cancelled</td>
							<td className={"align-middle"}>-</td>
						</tr>
	  			);
	  		} else if (request.swap_status === "completed") {
	  			return( <tr>
							<th className={'align-middle'} scope="row">{index+1}</th>
							<td className={"align-middle"}>{request.book_title}</td>
							<td className={"align-middle"}>{request.book_author}</td>
							<td className={"align-middle"}>{request.owner_username}</td>
							<td className={"align-middle"}>Completed</td>
							<td className={"align-middle"}>
								<a href={'/request/'+this.props.username+'/'+request.id}><button className={'btn btn-dark'}>Go to Request</button></a>
	  						</td>
						</tr>
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
		    		<div className = {'container-fluid'}>
			    		<div className= {'row'}>
			    			<div className={'offset-3 col-6 mt-5'}>
			    				<h2> People's Request</h2>
					    		<table class="table table-hover">
								 	<thead className={'thead-dark'}>
								    	<tr>
								      	<th scope="col">#</th>
								      	<th scope="col">Book</th>
								      	<th scope="col">Author</th>
								      	<th scope="col">Requester</th>
								      	<th scope="col">Status</th>
								      	<th scope="col">Action</th>
								    	</tr>
								 	</thead>
								  	<tbody>
								    	{peopleRequests}
								  	</tbody>
								</table>

								<h2> My Request</h2>
					    		<table class="table table-hover">
								 	<thead className={'thead-dark'}>
								    	<tr>
								      	<th scope="col">#</th>
								      	<th scope="col">Book</th>
								      	<th scope="col">Author</th>
								      	<th scope="col">Owner</th>
								      	<th scope="col">Status</th>
								      	<th scope="col">Action</th>
								    	</tr>
								 	</thead>
								  	<tbody>
								    	{myRequests}
								  	</tbody>
								</table>
							</div>
						</div>	
		    		</div>
		    	</BODY>
	        </html>   
    	);
	}
  }

module.exports = Allrequest;