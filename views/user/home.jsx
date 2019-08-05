var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');
var PROFILECARD = require('../components/profileCard.jsx');



class Home extends React.Component {
  render() {
  	if (this.props.searchStatus){
  		var searchBooks = this.props.byTitle.map(book => {
  			return <BOOKCARD book={book} />
  		});
		var searchAuthor = this.props.byAuthor.map(book => {
  			return <BOOKCARD book={book} />
  		});

		return (
	    	<html>
		    	<HEAD>
		    		<title>Social Library: {this.props.username} </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>
		    	<BODY>
		    		<NAVBAR name={this.props.name} username={this.props.username} photo={this.props.photo} pending={this.props.pending}/>
		    		<div className={'container-fluid'}>
		    			<div className={'row'}>
		    				<div className={'col-2 offset-2'}>
			    				<PROFILECARD name={this.props.name} photo={this.props.photo}/>
				    		</div>
				    		<div className={'col-6 mt-5'}>
					    		<ul className={"nav nav-tabs"} id={"profileTab"} role={"tablist"}>
	 								<li className={"nav-item"}>
	    								<a className={"nav-link active"} id={"book-tab"} data-toggle={"tab"} href={"#profileBooks"} role={"tab"} aria-controls={"profileBooks"} aria-selected={"true"}>Books</a>
	  								</li>
								</ul>
								<div className={"tab-content"} id={"myTabContent"}>
	 								<div className={"tab-pane fade show active"} id={"profileBooks"} role={"tabpanel"} aria-labelledby={"profile-book-tab"}>
	    								<form method={'GET'} action={'/home/'+this.props.username} className={'my-4'}>
				            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"profilebook-search"} defaultValue = {this.props.querySearch}/>
				            			</form>
				            			<div id={'profileBooksDiv'}>
				    						<h3 className={'searchAllTitle'}>Search By Title </h3>
		    									{searchBooks}
		    								<h3 className={'searchAllTitle'}>Search By Author </h3>
		    									{searchAuthor}
				    					</div>
				    				</div>
								</div>
			    			</div>
				    	</div>
			    	</div>
		    	</BODY>
	        </html>   
	    );


  	}else {
  	  	var books = this.props.books.map(book => {
	  		return <BOOKCARD book={book} />
		});

	    return (
	    	<html>
		    	<HEAD>
		    		<title>Social Library: {this.props.username} </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>
		    	<BODY>
		    		<NAVBAR name={this.props.name} username={this.props.username} photo={this.props.photo} pending={this.props.pending}/>
		    		<div className={'container-fluid'}>
		    			<div className={'row'}>
			    			<div className={'col-2 offset-2'}>
			    				<PROFILECARD name={this.props.name} photo={this.props.photo}/>
				    		</div>
				    		<div className={'col-6 mt-5'}>
					    		<ul className={"nav nav-tabs"} id={"profileTab"} role={"tablist"}>
	 								<li className={"nav-item"}>
	    								<a className={"nav-link active"} id={"book-tab"} data-toggle={"tab"} href={"#profileBooks"} role={"tab"} aria-controls={"profileBooks"} aria-selected={"true"}>Books</a>
	  								</li>
								</ul>
								<div className={"tab-content"} id={"myTabContent"}>
	 								<div className={"tab-pane fade show active"} id={"profileBooks"} role={"tabpanel"} aria-labelledby={"profile-book-tab"}>
	    								<form method={'GET'} action={'/home/'+this.props.username} className={'my-4'}>
				            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"profilebook-search"} />
				            			</form>
				            			<div id={'profileBooksDiv'}>
				    						{books}
				    					</div>
				    				</div>
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

module.exports = Home;

