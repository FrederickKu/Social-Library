var React = require("react");

class Navbar extends React.Component {
  render() {
    return (
      	<nav className={"container navbar navbar-expand navbar-light"}>
          <img src={'/img/logotnav.png'} id={'navbarLogo'} />
          <button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#mainNavbar"} aria-controls={"navbarTogglerDemo01"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse"} id={"mainNavbar"}>
            <div className={"nav navbar-nav mx-auto"} id = {'centernav'}>
                <div className={"nav-item dropdown"}>
                  <a className={"nav-link dropdown-toggle"} href={"#"} role={"button"} data-toggle={"dropdown"} aria-haspopup="true" aria-expanded="false">Profile</a>
                  <div className={"dropdown-menu"} aria-labelledby={"navbarDropdown"}>
                    <a className={"dropdown-item"} href={'/home/'+this.props.username}>My Profile</a>
                    <a class="dropdown-item" href="#">Requests Information</a>
                  </div>
                </div>
                <a className={"nav-item active nav-link"} href={'/books'}>The Exchange</a>
            </div>
            <div className={"nav navbar-nav mr-0"} id={'profilecontainer'}>
                <div className={'nav-item'}>  
                  <p id={'profiletext'}>Username<br />Name</p>
                </div>
                <div class="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle" href="#" id="profileimagecontainer" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id={'navprofile'} src={'/img/defaultperson.png'} /></a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Account Settings</a>
                    <a class="dropdown-item" href="#">Logout</a>
                  </div>
                </div>
            </div> 
          </div>
        </nav>
    );
  }
}

module.exports = Navbar;
