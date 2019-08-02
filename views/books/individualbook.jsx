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
  			return ( <div className={'mt-2'}>
  						<p>{review.book_review}</p>
  						<span>{review.username}</span>
  						<span>{String(review.review_date).slice(0,10)}</span>
  					 </div>)
  		})

  		if (this.props.ownership){
			return (
				<html>
					<HEAD>
						<title>Social Library: The Exchange </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.username} />
						<div className = {'container-fluid mt-5 sub-nav'}>
							<a href={'/books/'+this.props.book.id+'/edit'}><button> Edit </button></a>
							<span> | </span>
							<form method={'POST'} action={'/books/'+this.props.book.id+'?_method=DELETE'}>
								<button type={'submit'}>Delete Book</button>
							</form>
						</div>
						<div className = {'container-fluid mt-4'} >
							<div className={'row'}>
				    			<div className={'col-2 offset-2'}>
				    				<div className={"card"}>
	        							<img src = {this.props.book.book_image} className={'card-book-img'} />
								        <div className={"card-body"}>
								          <h5 className={'card-link card-title'}>{this.props.book.book_title}</h5>
								          <p className={'card-text card-link'} id={'card-author'}>{this.props.book.book_author}</p>
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
					    		<div className={'col-4 offset-1'}>

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
		} else {
			return (
				<html>
					<HEAD>
						<title>Social Library: The Exchange </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.username} />
						<div className = {'container-fluid mt-5 sub-nav'}>
							<form method={'POST'} action={'/books/'+this.props.book.id+'/request'}>
								<button type={'submit'}>Request</button>
							</form>
						</div>
						<div className = {'container-fluid mt-4'} >
							<div className={'row'}>
				    			<div className={'col-2 offset-2'}>
				    				<div className={"card"}>
	        							<img src = {this.props.book.book_image} className={'card-book-img'} />
								        <div className={"card-body"}>
								          <h5 className={'card-link card-title'}>{this.props.book.book_title}</h5>
								          <p className={'card-text card-link'} id={'card-author'}>{this.props.book.book_author}</p>
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
					    		<div className={'col-4 offset-1'}>

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