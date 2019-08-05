var React = require("react");

class Navbar extends React.Component {
  render() {

    let notification = this.props.pending.map(item =>{
      return (
        <div>
        <a className={"dropdown-item px-2"} href={'/request/'+this.props.username}>
          <div className ={'notification-container'}>
              <div className={'notificationleft'}>
                <img src={item.book_image} />
              </div>
              <div className={'notificationright'}>
                <p>{item.book_title}</p>
                <p>Request By: {item.username}</p>
              </div>
              <div style={{clear: 'both'}}></div>
          </div>
        </a>
        <div class="dropdown-divider"></div>
        </div>
      );
    })

    return (
      	<nav className={"container navbar navbar-expand navbar-light"}>
          <img src={'/img/logotnav.png'} id={'navbarLogo'} />
          <button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#mainNavbar"} aria-controls={"navbarTogglerDemo01"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse"} id={"mainNavbar"}>
            <div className={"nav navbar-nav mx-auto"} id = {'centernav'}>
                <div className={"nav-item dropdown"}>
                  <a className={"nav-link dropdown-toggle active"} href={"#"} role={"button"} data-toggle={"dropdown"} aria-haspopup="true" aria-expanded="false">Profile</a>
                  <div className={"dropdown-menu"} aria-labelledby={"navbarDropdown"}>
                    <a className={"dropdown-item"} href={'/home/'+this.props.username}>My Profile</a>
                    <a class="dropdown-item" href={'/books/add'}>Add Book</a>
                    <a class="dropdown-item" href={"/request/"+this.props.username}>Requests Information</a>
                  </div>
                </div>
                <a className={"nav-item active nav-link"} href={'/books'}>The Exchange</a>
            </div>
            <div className={"nav navbar-nav mr-0"} id={'profilecontainer'}>
                <div class="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle" href="#" id="bellimagecontainer" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id={'notification-bell'} src={'/img/bell.png'} /></a>
                  <p id={'red-circle'}></p>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <p id={'notificationtext'}>Pending Requests</p>
                    <div class="dropdown-divider"></div>
                    {notification}
                  </div>
                </div>
                <div class="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle" href="#" id="profileimagecontainer" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id={'navprofile'} src={this.props.photo} /></a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <p id={'profiletext'}>User: {this.props.username}</p>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" id={'account-setting-link'} href="#" data-toggle={"modal"} data-target={"#editAccountModal"}>Account Settings</a>
                    <a class="dropdown-item" href={'/logout'}>Logout</a>
                  </div>
                </div>
                <div className={"modal fade"} id={"editAccountModal"} tabindex={"-1"} role={"dialog"} aria-labelledby={"editAccountModal"} aria-hidden={"true"}>
                        <div className={"modal-dialog modal-dialog-centered"} role={"document"}>
                          <div className={"modal-content"} id={'account-setting-form'}>
                              <div className={"modal-header"}>
                                <h5 className={"modal-title"} id={"modalTitle"}>Edit Account Settings</h5>
                                <button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
                                    <span aria-hidden={"true"}>&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p id={'incorrect-current'}>*Incorrect Current Password</p>
                                <p id={'incorrect-match'}>*New password does not match</p>
                                <form >
                                  <div className={"form-group"}>
                                    <label for={"account_current_password"}>Current Password</label>
                                    <input type={"password"} className={"form-control"} id={"account_current_password"} placeholder={"Current Password"} name={'account_current_password'} />
                                  </div>
                                  <div className={"form-group"}>
                                    <label for={"account_password"}>New Password</label>
                                    <input type={"password"} className={"form-control"} id={"account_password"} placeholder={"New Password"} name={'account_password'} />
                                  </div>
                                  <div className={"form-group"}>
                                    <label for={"account_confirm_password"}>Confirm New Password</label>
                                    <input type={"password"} className={"form-control"} id={"account_confirm_password"} placeholder={"Confirm New Password"} name={'account_confirm_password'} />
                                  </div>
                                  <div class="modal-footer">
                                    <button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
                                    <button type={'button'} id={'confirmChange'} class={"btn btn-dark"}>Submit</button>
                                  </div>
                              </form>
                            </div>
                        </div>
                        <div className={"modal-content"} id={'successful-password'}>
                              <div className={"modal-header"}>
                                <h5 className={"modal-title"} id={"modalTitle"}>Password Change Successful</h5>
                                <button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
                                    <span aria-hidden={"true"}>&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p> You have successfully changed your password!</p><br />
                                <p> Re-Login to enter the portal again</p>
                                  <div class="modal-footer account-footer">
                                    <a href={'/logout'}><button className={'btn btn-dark'}>Logout</button></a>
                                  </div>
                            </div>
                        </div>
                      </div>
                </div>
            </div> 
          </div>
        </nav>   
    );
  }
}

module.exports = Navbar;
