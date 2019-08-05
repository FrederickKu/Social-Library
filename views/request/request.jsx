var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');
var PROFILECARD = require('../components/profileCard.jsx');

class requestPage extends React.Component {
  render() {
  		if (this.props.requestBookDetail.owner_handshake && this.props.requestBookDetail.recipient_handshake){
  			//This is when both confirm swap
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.username} />
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-6'}>
				    				<PROFILECARD name={this.props.ownerDetail.user_name} photo={this.props.ownerDetail.user_photo} />
				    			</div>
				    			<div className={'col-6'}>	
			    					<PROFILECARD name={this.props.recipientDetails.user_name} photo={this.props.recipientDetails.user_photo} />
			    				</div>
			    				<div className = {'col-4'}>
			    					<p> book DIV HERE </p>
			    					<p> Approved HURRAY</p>
			    				</div>
			    				<div  className={'col-8'}>
			    					<p> CHAT BOX HERE </p>
			    				</div>
			    			</div>
			    		</div>
			    	</BODY>
		        </html>   
    		);

  		} else if (this.props.requestBookDetail.owner_handshake && this.props.username === this.props.ownerDetail.username){
  			//This is when owner has approved and is owner 
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.username} />
			    		<div className = {'container'} >
			    			<div className={'row'}>
				    			<div className={'col-6'}>
				    				<PROFILECARD name={this.props.ownerDetail.user_name} photo={this.props.ownerDetail.user_photo} />
				    			</div>
				    			<div className={'col-6'}>	
			    					<PROFILECARD name={this.props.recipientDetails.user_name} photo={this.props.recipientDetails.user_photo} />
			    				</div>
			    				<div className = {'col-4'}>
			    					<p> book DIV HERE </p>
			    					<p> Approved</p>
			    				</div>
			    				<div  className={'col-8'}>
			    					<p> CHAT BOX HERE </p>
			    				</div>
			    			</div>
			    		</div>
			    	</BODY>
		        </html>   
    		);

  		} else if (this.props.requestBookDetail.recipient_handshake && this.props.username === this.props.recipientDetails.username){
  			//this is when recipient has approved and is recipient
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.username} />
			    		<div className = {'container'} >
			    			<div className={'row'}>
				    			<div className={'col-6'}>
				    				<PROFILECARD name={this.props.ownerDetail.user_name} photo={this.props.ownerDetail.user_photo} />
				    			</div>
				    			<div className={'col-6'}>	
			    					<PROFILECARD name={this.props.recipientDetails.user_name} photo={this.props.recipientDetails.user_photo} />
			    				</div>
			    				<div className = {'col-4'}>
			    					<p> book DIV HERE </p>
			    					<p> Approved</p>
			    				</div>
			    				<div  className={'col-8'}>
			    					<p> CHAT BOX HERE </p>
			    				</div>
			    			</div>
			    		</div>
			    	</BODY>
		        </html>   
    		);

  		} else {
  			//covers all other situation
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.username} />
			    		<div className = {'container'} >
			    			<div className={'row'}>
				    			<div className={'col-6'}>
				    				<PROFILECARD name={this.props.ownerDetail.user_name} photo={this.props.ownerDetail.user_photo} />
				    			</div>
				    			<div className={'col-6'}>	
			    					<PROFILECARD name={this.props.recipientDetails.user_name} photo={this.props.recipientDetails.user_photo} />
			    				</div>
			    				<div className = {'col-4'}>
			    					<p> book DIV HERE </p>
			    					<form method={'POST'} action={'/request/'+this.props.username+'/'+this.props.requestid+'/confirm?_method=PUT'}>
		  								<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  								<button type={'submit'}>Confirm Swap</button>
		  							</form>
			    				</div>
			    				<div  className={'col-8'}>
			    					<p> CHAT BOX HERE </p>
			    				</div>
			    			</div>
			    		</div>
			    	</BODY>
		        </html>   
    		);
  		}
	  	
	}
  }

module.exports = requestPage;