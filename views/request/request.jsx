var React = require("react");
var HEAD = require('../layouts/head.jsx')
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');
var PROFILECARD = require('../components/profileCard.jsx');

class RequestPage extends React.Component {
  render() {
  		  if (this.props.requestBookDetail.swap_status==='cancelled'){
  			//cancelled
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: Request #{this.props.requestid} </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending} />
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
				    					<button className={'btn btn-danger'} disabled> Swap Cancelled </button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    						
			    					</div>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
				    				<h2> Chat box</h2>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}  placeholder={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.requestBookDetail.owner_handshake && this.props.requestBookDetail.recipient_handshake){
  			//This is when both confirm swap
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: Request #{this.props.requestid} </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>
			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending} />
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
				    					<button className={'btn btn-success'} disabled> Swap Completed </button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    						
			    					</div>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}   placeholder ={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);

  		} else if (this.props.requestBookDetail.owner_handshake && this.props.username === this.props.ownerDetail.username){
  			//This is when owner has approved and recipient have not
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending}/>
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
		  								<button className={'btn btn-success'} disabled>Confirmed Swap</button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
	  									<button className={'btn btn-light'} disabled>Awaiting Confirmation</button>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
			    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
		  							</form>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}   placeholder ={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.requestBookDetail.recipient_handshake && this.props.username === this.props.recipientDetails.username){
  			//this is when recipient has approved and  owner have not 
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending} />
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
	  									<button className={'btn btn-light'} disabled>Awaiting Confirmation</button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
		  								<button className={'btn btn-success'} disabled>Confirmed Swap</button>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
			    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
		  							</form>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}   placeholder ={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.requestBookDetail.recipient_handshake && this.props.username === this.props.ownerDetail.username){
  			//this is when recipient has approved and owner have not
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending} />
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
				    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/'+this.props.requestid+'/confirm?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-dark'} type={'submit'}>Confirm Swap</button>
		  								</form>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
		  								<button className={'btn btn-success'} disabled>Confirmed Swap</button>		  						
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
		    						<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
	  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
	  								</form>			    						
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}   placeholder ={'Add Message'} />
			    				</div>

			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.requestBookDetail.owner_handshake && this.props.username === this.props.recipientDetails.username){
  			//this is when owner has approved and is recipient have not
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending}/>
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
		  								<button className={'btn btn-success'} disabled>Confirmed Swap</button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
		  								<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/'+this.props.requestid+'/confirm?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-dark'} type={'submit'}>Confirm Swap</button>
		  								</form>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
			    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
	  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
	  								</form>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}   placeholder ={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.username === this.props.ownerDetail.username) {
  			//owner but not yet accept
  			return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending}/>
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
				    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/'+this.props.requestid+'/confirm?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-dark'} type={'submit'}>Confirm Swap</button>
		  								</form>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
	  									<button className={'btn btn-light'} disabled>Awaiting Confirmation</button>

				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
			    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
	  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
	  								</form>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
				    				<h2> Chat box</h2>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}  placeholder={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		} else if (this.props.username === this.props.recipientDetails.username) {
  			//recipient but not yet accept
  			 return (
		    	<html>
			    	<HEAD>
			    		<title>Social Library: The Exchange </title>
			    		<link rel={"stylesheet"} href={`/css/style.css`} />
			    	</HEAD>

			    	<BODY>
			    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} pending={this.props.pending}/>
			    		<div className = {'container-fluid'} >
			    			<div className={'row'}>
				    			<div className={'col-4 offset-1 request-details mt-5'}>
				    				<div className={'p-2'} id={'request-owner-details'}> 
				    					<h3> Owner </h3>
				    					<img src = {this.props.ownerDetail.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.ownerDetail.username}</h5>
								        </div>
				    				</div>
				    				<div id={'swap-confirmation'}>
				    					<p className={'m-0'} id={'owner-arrow'} ><span>⇜</span>owner</p>
				    						<button className={'btn btn-light'} disabled>Awaiting Confirmation</button>
		  								<p className={'m-0'} id={'recipient-arrow'}>recipient<span>⇝</span></p>
		  								<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/'+this.props.requestid+'/confirm?_method=PUT'}>
		  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
		  									<button className={'btn btn-dark'} type={'submit'}>Confirm Swap</button>
		  								</form>
				    				</div>
				    				<div className={'p-2'} id={'request-recipient-details'}>
				    					<h3> Recipient</h3>
				    					<img src = {this.props.recipientDetails.user_photo} />
								        <div className={"detail-text mt-3"}>
								          <h5>{this.props.recipientDetails.username}</h5>
								        </div>
			    					</div>
			    					<div className={"my-4 p-4"} id={'request-book-div'}>
			    						<h3> Book Details</h3>
			    						<img src = {this.props.requestBookDetail.book_image} />
			    						<div id={'request-book-header'}>
			    							<h3> Title:{this.props.requestBookDetail.book_title}</h3>
			    							<h4 className={'mt-3'}>Author: {this.props.requestBookDetail.book_author}</h4>
			    							<h4 className={'mt-3'}> Book Synopsis </h4>
			    						<p> {this.props.requestBookDetail.book_synopsis} </p>
			    						</div>
				  						<div style={{clear: 'both'}}></div>
			    					</div>
			    					<form className={'mb-3'} method={'POST'} action={'/request/'+this.props.username+'/reject?_method=PUT'}>
	  									<input type={"hidden"} name={"request"} defaultValue={this.props.requestid} />
	  									<button className={'btn btn-danger btn-lg'} type={'submit'}>Cancel Swap</button>
	  								</form>
				    			</div>
				    			<div className={'col-6 mt-5'} id={'request-chat-box'}>
			    					<div id={'chat-area'}></div>
			    					<input type={'text'} className={'chat-input'} id={this.props.requestid}  placeholder ={'Add Message'} />
			    				</div>
			    			</div>
			    		</div>
	   		          <script src={'/script/chatscript.js'} />
			    	</BODY>
		        </html>   
    		);
  		}
	}
  }

module.exports = RequestPage;