var React = require("react");

class ProfileCard extends React.Component {
  render() {
    return (
      <div className={"card"}>
        <a href="#">
        <img src = {this.props.book.book_image} className={'card-book-img'} />
        <p className={'card-link card-book-review'}> 4.5 </p>
        <div className={"card-body"}>
          <h5 className={'card-link card-title'}>{this.props.book.book_title}</h5>
          <p className={'card-text card-link'} id={'card-author'}>{this.props.book.book_author}</p>
        </div>
        </a>
      </div>
    );
  }
}

module.exports = ProfileCard;
