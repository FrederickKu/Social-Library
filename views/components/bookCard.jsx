var React = require("react");

class BookCard extends React.Component {
  render() {
    return (
      <div className={"card"}>
        <a href={"/books/"+this.props.book.id}>
        <img src = {this.props.book.book_image} className={'card-book-img'} />
        <p className={'card-link card-book-review'}> {Math.floor(Math.random()*5)} </p>
        <div className={"card-body"}>
          <h5 className={'card-link card-title'}>{this.props.book.book_title}</h5>
          <p className={'card-text card-link'} id={'card-author'}>{this.props.book.book_author}</p>
        </div>
        </a>
      </div>
    );
  }
}

module.exports = BookCard;
