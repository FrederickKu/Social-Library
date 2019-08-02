var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Allbooks extends React.Component {
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
		    		<title>Social Library: The Exchange </title>
		    		<link rel={"stylesheet"} href={`/css/style.css`} />
		    	</HEAD>
		    	<BODY>
		    		<NAVBAR username={this.props.username} />
		    		<div className = {'container-fluid'} >
		    			<div className={'search-bar'}>
		    				<form method={'GET'} action={'/books'}>
	            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"allbook-search"} />
	            			</form>
		    			</div>
		    			<div id={'display-book'}>
		    				<h3 className={'searchAllTitle'}>Search By Title </h3>
		    				{searchBooks}
		    				<h3 className={'searchAllTitle'}>Search By Author </h3>
		    				{searchAuthor}
		    			</div>
		    		</div>
		    	</BODY>
	        </html>
	       );  

	} else { 
		var books = this.props.books.map(book => {
	  		return <BOOKCARD book={book} />
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