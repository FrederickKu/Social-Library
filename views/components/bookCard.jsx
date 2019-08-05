var React = require("react");

class BookCard extends React.Component {
  render() {
    if(this.props.book.book_status === 'available') {
        return (
          <div className={"card mx-2"}>
            <a href={"/books/"+this.props.book.id} id ={'bookcard-link'}>
            <div className={'bookcard'}>
            <img src = {this.props.book.book_image} className={'card-book-img'} />
            <div className={"card-body"}>
              <h5 className={'card-title'}>{this.props.book.book_title}</h5>
              <p className={'card-text my-2 '} id={'card-author'}>{this.props.book.book_author}</p>
              <button className={'btn btn-success'} disabled> Available </button>
            </div>
            </div>
            </a>
          </div>
        );
      } else {
        return (
          <div className={"card mx-2"}>
            <a href={"/books/"+this.props.book.id} id ={'bookcard-link'}>
            <div className={'bookcard'}>
            <img src = {this.props.book.book_image} className={'card-book-img'} />
            <div className={"card-body"}>
              <h5 className={'card-title'}>{this.props.book.book_title}</h5>
              <p className={'card-text my-2 '} id={'card-author'}>{this.props.book.book_author}</p>
              <button className={'btn btn-secondary'} disabled> Pending Swap </button>
            </div>
            </div>
            </a>
          </div>
        );
      }
  }
}

module.exports = BookCard;
