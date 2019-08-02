var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');
var BOOKCARD = require('../components/bookCard.jsx');

class Editbooks extends React.Component {
  render() {
			return (
				<html>
					<HEAD>
						<title>Social Library: The Exchange </title>
						<link rel={"stylesheet"} href={`/css/style.css`} />
					</HEAD>
					<BODY>
						<NAVBAR username={this.props.username} />
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
					    		</div>
					    		<div className={'col-4 offset-1'}>
					    			<div id = {'booksynopsis'}>
					    				<h2>Synopsis</h2>
					    				<p>{this.props.book.book_synopsis}</p>
					    			</div>
				    			</div>
				    			<div className={'col-3'}>
				    			</div>
				    			<div className={'offset-4 col-4'}>
				    				<form method={'POST'} action={'/books/'+this.props.book.id+'/edit?_method=PUT'}>
									  <div className={"form-group"}>
									    <label for={"book_title_edit"}>Book Title</label>
									    <input type={"text"} className={"form-control"} id={"book_title_edit"} placeholder={"Book Title"} name={'book_title'} defaultValue={this.props.book.book_title} />
									  </div>
									  <div className={"form-group"}>
									    <label for={"book_author_edit"}>Book Author</label>
									    <input type={"text"} className={"form-control"} id={"book_author_edit"} placeholder={"Book Author"} name={'book_author'} defaultValue={this.props.book.book_author} />
									  </div>
									  <div className={"form-check"}>
									    <label for={"book_image_edit"}>Book Image</label>
									    <input type={"text"} className={"form-control"} id={"book_author_image"} placeholder={"Book Image"} name={'book_image'} defaultValue={this.props.book.book_image} />
									  </div>
									  <div className={"form-check"}>
									    <label for={"book_synopsis_edit"}>Book Synopsis</label>
                        				<textarea className={"form-control"} id={"book_synopsis"} placeholder={'Book Synopsis'} rows={'5'} name={'book_synopsis'} defaultValue={this.props.book.book_synopsis}></textarea>
									  </div>
									  <button type="submit" class="btn btn-primary">Submit</button>
									</form>
				    			</div>
					    	</div>
						</div>
					</BODY>
				</html>   
			);
		}
  }

module.exports = Editbooks;