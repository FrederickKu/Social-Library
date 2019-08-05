var React = require("react");

class ProfileCard extends React.Component {
  render() {
    return (
      <div className={"card profile-card mt-5"}>
        <img src = {this.props.photo} className={'profile-card-img'} />
        <div className={"card-body profile-card-body"}>
          <h5 className={'card-link card-title'}>{this.props.name}</h5>
        </div>
      </div>
    );
  }
}

module.exports = ProfileCard;
