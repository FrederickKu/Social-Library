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
		    		<NAVBAR username={this.props.username}/>
		    		<div className={'container-fluid'}>
		    			<div className={'row'}>
			    			<div className={'col-2 offset-2'}>
			    				<PROFILECARD name={this.props.name} photo={this.props.photo}/>
				    		</div>
				    		<div className={'col-5 offset-1 mt-4'}>
				    			<h2 id={'profile-book-header'}> {this.props.name}'s Books </h2>
			    				<div id={'profileBookDisplay'}>
			    					<form method={'GET'} action={'/home/'+this.props.username}>
			            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"allbook-search"} />
			            			</form>
			    					<h3 className={'searchAllTitle'}>Search By Title </h3>
		    						{searchBooks}
		    						<h3 className={'searchAllTitle'}>Search By Author </h3>
		    						{searchAuthor}
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
		    		<NAVBAR username={this.props.username}/>
		    		<div className={'container-fluid'}>
		    			<div className={'row'}>
			    			<div className={'col-2 offset-2'}>
			    				<PROFILECARD name={this.props.name} photo={this.props.photo}/>
				    		</div>
				    		<div className={'col-5 offset-1 mt-4'}>
				    			<h2 id={'profile-book-header'}> {this.props.name}'s Books </h2>
			    				<div id={'profileBookDisplay'}>
			    					<form method={'GET'} action={'/home/'+this.props.username}>
			            				<input type={"search"} placeholder={"Search by title or author"} name={'search'} className={"form-control"} id={"allbook-search"} />
			            			</form>
			    					{books}
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

