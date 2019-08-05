var React = require("react");
var HEAD = require('../layouts/head.jsx');
var BODY = require('../layouts/body.jsx');
var NAVBAR = require('../layouts/navbar.jsx');


class Addbook extends React.Component {
  render() {
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
				    			<div className={'col-10 offset-1 addForm mt-5'}>
	        						<h1> Add new Book </h1>
	  								<form method={'POST'} action={'/books/add'}>
									  <div className={"form-group"}>
									    <label for={"book_title_add"}>Book Title</label>
									    <input type={"text"} className={"form-control"} id={"book_title_add"} placeholder={"Book Title"} name={'book_title'}  />
									  </div>
									  <div className={"form-group"}>
									    <label for={"book_author_add"}>Book Author</label>
									    <input type={"text"} className={"form-control"} id={"book_author_add"} placeholder={"Book Author"} name={'book_author'}  />
									  </div>
									  <div className={"form-group"}>
									    <label for={"book_image_add"}>Book Image</label>
									    <input type={"text"} className={"form-control"} id={"book_image_add"} placeholder={"Book Image"} name={'book_image'} defaultValue={'/img/default-book.jpg'} />
									  </div>
									  <div className={"form-group"}>
									    <label for={"book_synopsis_add"}>Book Synopsis</label>
	                    				<textarea className={"form-control"} id={"book_synopsis_add"} placeholder={'Book Synopsis'} rows={'5'} name={'book_synopsis'} ></textarea>
									  </div>
										<button type={"submit"} id={'confirmEdit'} class={"btn btn-dark"}>Add Book</button>
									</form>
								</div>
					    	</div>
						</div>
					</BODY>
				</html>   
			);
		}
	}
module.exports = Addbook;