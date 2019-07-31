var React = require("react");

class Navbar extends React.Component {
  render() {
    return (
      	<nav className={"row navbar navbar-expand-lg navbar-dark"}>
          <img src={'/img/tweedr2.png'} />
          <button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#navbarToggler01"} aria-controls={"navbarTogglerDemo01"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse"} id={"navbarToggler01"}>
            <ul className={"navbar-nav mt-2 mt-lg-0"} id={'navbar'}>
                <li className={"nav-item active"}>
                  <a className={"nav-link"} href={`/home/${this.props.username}`}>Home</a>
                </li>
                <li className={"nav-item active"}>
                  <a className={"nav-link"} href={`/home/${this.props.username}/alltweeds`}>All My Tweeds</a>
                </li>
                <li className={"nav-item active"}>
                  <a className={"nav-link"} href="#">All My Followers</a>
                </li>
            </ul>
          </div>
          <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
    );
  }
}

module.exports = Navbar;
