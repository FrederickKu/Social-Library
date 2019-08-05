var React = require("react");

class BookCard extends React.Component {
  render() {
    return (
      <div className={"card bookcard"}>
        <a href={"/books/"+this.props.book.id} id ={'bookcard-link'}>
        <img src = {this.props.book.book_image} className={'card-book-img'} />
        <div className={"card-body"}>
          <h5 className={'card-title'}>{this.props.book.book_title}</h5>
          <p className={'card-text '} id={'card-author'}>{this.props.book.book_author}</p>
        </div>
        </a>
      </div>
    );
  }
}

module.exports = BookCard;
