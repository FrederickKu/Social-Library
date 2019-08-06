var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Allbooks extends React.Component {
  render() {
  	if (this.props.searchStatus){
  		var searchBooks = this.props.byTitle.map(book => {
  			return <BOOKCARD book={book} id={this.props.userDetails.id}/>
  		});
		var searchAuthor = this.props.byAuthor.map(book => {
  			return <BOOKCARD book={book} id={this.props.userDetails.id}/>
  		});

  		return (
	    	<html>
		    	<HEAD>
		    		<title>Social Library: The Exchange </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>  
		    	<BODY>
		    		<NAVBAR username={this.props.userDetails.username} name={this.props.userDetails.user_name} photo = {this.props.userDetails.user_photo} pending={this.props.pending} />
		    		<div className = {'container-fluid'} >
		    			<div className={'search-bar'}>
		    				<form method={'GET'} action={'/books'}>
	            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"allbook-search"} />
	            			</form>
		    			</div>
		    			<div id={'display-book'}>
		    				<h3 className={'searchAllTitle mb-5'}>Search By Title </h3>
		    				{searchBooks}
		    				<h3 className={'searchAllTitle my-5'}>Search By Author </h3>
		    				{searchAuthor}
		    			</div>
		    		</div>
		    	</BODY>
	        </html>
	       );  

	} else { 
		var books = this.props.books.map(book => {
	  		return <BOOKCARD book={book} id={this.props.user.id} />
	  	});

	  	return (
	    	<html>
		    	<HEAD>
		    		<title>Social Library: The Exchange </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>
		    	<BODY>
		    		<NAVBAR username={this.props.user.username} name={this.props.user.user_name} photo = {this.props.user.user_photo} pending={this.props.pending} />
		    		<div className = {'container-fluid'} >
		    			<div className={'search-bar'}>
		    				<form method={'GET'} action={'/books'}>
	            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"allbook-search"} />
	            			</form>
		    			</div>
		    			<div id={'display-book'}>
		    				{books}
		    			</div>
		    		</div>
		    	</BODY>
	        </html>   
    	);
	}
  }
}

module.exports = Allbooks;