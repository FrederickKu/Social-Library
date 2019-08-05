var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Individualbook extends React.Component {
  render() {
  		let owners = this.props.ownerHistory.map((owner,index) => {
  			return (<tr>
      				<th scope="row">{index+1}</th>
      					<td>{owner.username}</td>
      					<td>{String(owner.start_owned_date).slice(0,10)}</td>
    				</tr>);
  		})

  		let reviews = this.props.bookReviews.map((review,index) => {
  			return ( <div className={'mt-2 reviews'}>
  						<p>{review.book_review}</p>
  						<div id={'username_date'}>
  							<span id={'left'}>{review.username}</span>
  							<span id={'right'}>{String(review.review_date).slice(0,10)}</span>
  						</div>
  						<div style={{clear: 'both'}}></div>
  					 </div>)
  		})

  		if (this.props.ownership){
			return (
				<html>
					<HEAD>
						<title>Social Library: {this.props.book.book_title} </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} />
						<div className = {'container-fluid mt-5'} >
							<div className={'row'}>
				    			<div className={'col-2 offset-3'}>
	        						<img src = {this.props.book.book_image} id={'individualBookImage'} />
								    <div className = {'mt-3'} id ={'individualBookButtons'}>
				           				<button type={"button"} id={'editbook'} className={"btn btn-dark mb-2"} data-toggle={"modal"} data-target={"#editBookModal"}> Edit Book Details </button>
										<form method={'POST'} action={'/books/'+this.props.book.id+'?_method=DELETE'}>
											<button className={'btn btn-dark'} type={'submit'}>Delete Book</button>
										</form>
										<div className={"modal fade"} id={"editBookModal"} tabindex={"-1"} role={"dialog"} aria-labelledby={"editBookModal"} aria-hidden={"true"}>
				  							<div className={"modal-dialog modal-dialog-centered"} role={"document"}>
				    							<div className={"modal-content"}>
					      							<div className={"modal-header"}>
					       								<h5 className={"modal-title"} id={"modalTitle"}>Edit Book Details</h5>
					        							<button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
					          								<span aria-hidden={"true"}>&times;</span>
					        							</button>
					      							</div>
					      							<div class="modal-body">
					      								<form method={'POST'} action={'/books/'+this.props.book.id+'/edit?_method=PUT'}>
														  <div className={"form-group "}>
														    <label for={"book_title_edit"}>Book Title</label>
														    <input type={"text"} className={"form-control"} id={"book_title_edit"} placeholder={"Book Title"} name={'book_title'} defaultValue={this.props.book.book_title} />
														  </div>
														  <div className={"form-group"}>
														    <label for={"book_author_edit"}>Book Author</label>
														    <input type={"text"} className={"form-control"} id={"book_author_edit"} placeholder={"Book Author"} name={'book_author'} defaultValue={this.props.book.book_author} />
														  </div>
														  <div className={"form-group"}>
														    <label for={"book_image_edit"}>Book Image</label>
														    <input type={"text"} className={"form-control"} id={"book_author_image"} placeholder={"Book Image"} name={'book_image'} defaultValue={this.props.book.book_image} />
														  </div>
														  <div className={"form-group"}>
														    <label for={"book_synopsis_edit"}>Book Synopsis</label>
					                        				<textarea className={"form-control"} id={"book_synopsis"} placeholder={'Book Synopsis'} rows={'5'} name={'book_synopsis'} defaultValue={this.props.book.book_synopsis}></textarea>
														  </div>
														  <div class="modal-footer">
				        									<button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
				        									<button type={"submit"} id={'confirmEdit'} class={"btn btn-dark"}>Edit</button>
												    	  </div>
														</form>
													</div>
				    							</div>
				  							</div>
										</div>
									</div>
								    <div id={'ownerhistory'}>
				    					<h2>Owner History</h2>
					    				<table class="table">
										  	<thead>
											    <tr>
											      	<th scope="col">#</th>
											      	<th scope="col">User</th>
											    	<th scope="col">Starting Date</th>
												</tr>
										  	</thead>
										  	<tbody>
					    						{owners}
					    					</tbody>
					    				</table>
				    				</div>
					    		</div>
					    		<div className={'col-4'} id ={'individualBookDescription'}>
						    		<h1> Title: {this.props.book.book_title}</h1>
						    		<h3> Author: {this.props.book.book_author}</h3>
					    			<div id = {'booksynopsis'}>
					    				<h2>Synopsis</h2>
					    				<p>{this.props.book.book_synopsis}</p>
					    			</div>

					    			<div id = {'bookreviews'}>
					    				<div id= {'review-header'}>
					    					<h3 id={'left'}>Reviews</h3>
					    					<button type={"button"} id={'editbook'} className={"btn btn-dark mb-2 rightFloat"} data-toggle={"modal"} data-target={"#addBookReviewModal"}> Add Review </button>
   					  						<div style={{clear: 'both'}}></div>
					    				</div>
					    				<div className={"modal fade"} id={"addBookReviewModal"} tabindex={"-1"} role={"dialog"} aria-labelledby={"addBookReviewModal"} aria-hidden={"true"}>
				  							<div className={"modal-dialog modal-dialog-centered"} role={"document"}>
				    							<div className={"modal-content"}>
					      							<div className={"modal-header"}>
					       								<h5 className={"modal-title"} id={"modalTitle"}>Add Book Review</h5>
					        							<button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
					          								<span aria-hidden={"true"}>&times;</span>
					        							</button>
					      							</div>
					      							<div class="modal-body">
					      								<form method={'POST'} action={'/books/'+this.props.book.id+'/addreview'}>
														  <div className={"form-group"}>
					                        				<textarea className={"form-control"} id={"book_review"} placeholder={'Book Review'} rows={'5'} name={'book_review'}></textarea>
														  </div>
														  <div class="modal-footer">
				        									<button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
				        									<button type={"submit"} id={'confirmAddReview'} class={"btn btn-dark"}>Add</button>
												    	  </div>
														</form>
													</div>
				    							</div>
				  							</div>
										</div>
					    				{reviews}
					    			</div>
				    			</div>
					    	</div>
						</div>
					</BODY>
				</html>   
			);
		} else if (this.props.book.swap_status ==='available') {
			return (
				<html>
					<HEAD>
						<title>Social Library: {this.props.book.book_title} </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} />
						<div className = {'container-fluid mt-5'} >
							<div className={'row'}>
				    			<div className={'col-2 offset-3'}>
	        						<img src = {this.props.book.book_image} id={'individualBookImage'} />
								    <div className = {'mt-3'} id ={'individualBookButtons'}>
										<form method={'POST'} action={'/books/'+this.props.book.id+'/request'}>
											<button className={'btn btn-dark'} type={'submit'}>Request</button>
										</form>
									</div>
								    <div id={'ownerhistory'}>
				    					<h2>Owner History</h2>
					    				<table class="table">
										  	<thead>
											    <tr>
											      	<th scope="col">#</th>
											      	<th scope="col">User</th>
											    	<th scope="col">Starting Date</th>
												</tr>
										  	</thead>
										  	<tbody>
					    						{owners}
					    					</tbody>
					    				</table>
				    				</div>
					    		</div>
					    		<div className={'col-4'} id ={'individualBookDescription'}>
						    		<h1> Title: {this.props.book.book_title}</h1>
						    		<h3> Author: {this.props.book.book_author}</h3>
					    			<div id = {'booksynopsis'}>
					    				<h3>Synopsis</h3>
					    				<p>{this.props.book.book_synopsis}</p>
					    			</div>

					    			<div id = {'bookreviews'}>
					    				<h2>Reviews</h2>
					    				{reviews}
					    			</div>
				    			</div>
					    	</div>
						</div>
					</BODY>
				</html>   
			);
		} else {
			return (
				<html>
					<HEAD>
						<title>Social Library: The Exchange </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo={this.props.userDetails.user_photo} />
						<div className = {'container-fluid mt-5'} >
							<div className={'row'}>
				    			<div className={'col-2 offset-3'}>
	        						<img src = {this.props.book.book_image} id={'individualBookImage'} />
								    <div className = {'mt-3'} id ={'individualBookButtons'}>
										<button className={'btn btn-light'} disabled>Pending Swap</button>
									</div>
								    <div id={'ownerhistory'}>
				    					<h2>Owner History</h2>
					    				<table class="table">
										  	<thead>
											    <tr>
											      	<th scope="col">#</th>
											      	<th scope="col">User</th>
											    	<th scope="col">Starting Date</th>
												</tr>
										  	</thead>
										  	<tbody>
					    						{owners}
					    					</tbody>
					    				</table>
				    				</div>
					    		</div>
					    		<div className={'col-4'} id ={'individualBookDescription'}>
						    		<h1> Title: {this.props.book.book_title}</h1>
						    		<h3> Author: {this.props.book.book_author}</h3>
					    			<div id = {'booksynopsis'}>
					    				<h2>Synopsis</h2>
					    				<p>{this.props.book.book_synopsis}</p>
					    			</div>

					    			<div id = {'bookreviews'}>
					    				<h2>Reviews</h2>
					    				{reviews}
					    			</div>
				    			</div>
					    	</div>
						</div>
					</BODY>
				</html>   
			);
		}
	}
  }
module.exports = Individualbook;