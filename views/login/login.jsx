var React = require("react");
var HEAD = require('../layouts/head.jsx');

class Login extends React.Component {
  render() {
  	if (Object.keys(this.props).length!==0){
  		if (this.props.error === 'username'){
  			var errormessage= <p id={'loginFailure'}>*Incorrect username. Please try again.</p>;		
  		} else if (this.props.error === 'password') {
  			var errormessage= <p id={'loginFailure'}>*Wrong password. Please try again.</p>;
  		}
  	} else {
  		var errormessage = <p id={'loginFailure'}></p>;
  	}
    return (
    	<html>
	    	<HEAD>
	    		<title>Welcome to Social Library</title>
	    		<link rel={"stylesheet"} href={`/css/loginstyle.css`} />
	    	</HEAD>
	    	<body>
        		<main className={'container-fluid'}>
					<div className = {'row'}>
						<div className = {'col-9'} id ={'loginImage'}>
						</div>
						<div className = {'col-3'} id = {'loginPagebar'}>
							<img src={'/img/logot.png'} id = {'logo'}/>
				      		<form method={'POST'} action ={'/'} id ={'loginForm'}>
				              <div className={"form-group"}>
				                <input type={"text"} id={'loginUsername'}  className={"form-control"} placeholder ={'Username'} aria-describedby={"Username"} name={'username'} />
				              </div>
				              <div className={"form-group"}>
				                <input type={"password"} id={'loginPassword'} className={"form-control"} placeholder ={'Password'} aria-describedby={"Password"} name={'password'} />
				              </div>
				              {errormessage}
				              <button type={'submit'} className={'btn btn-dark btn-lg'}>Login</button>
				            </form>
				            <p> No Account Yet?</p>
				            <button type={"button"} id={'register'} className={"btn btn-dark btn-lg"} data-toggle={"modal"} data-target={"#registerModal"}> Register </button>
				         </div>
				         <div className={"modal fade"} id={"registerModal"} tabindex={"-1"} role={"dialog"} aria-labelledby={"registerModal"} aria-hidden={"true"}>
	  							<div className={"modal-dialog modal-dialog-centered"} role={"document"}>
	    							<div className={"modal-content"}>
		      							<div className={"modal-header"}>
		       								<h5 className={"modal-title"} id={"modalTitle"}>Register Account</h5>
		        							<button type={"button"} className={"close"} data-dismiss={"modal"} aria-label={"Close"}>
		          								<span aria-hidden={"true"}>&times;</span>
		        							</button>
		      							</div>
		      							<div class="modal-body">
		      								<p id={'registerSuccess'}> You have successfully registered an account. You may now log into the portal.</p>
	                						<p id={'registerFailure'}> *Duplicate username found. Please try again. </p>
									        <form id={'registerForm'}>
	                							<div className={"form-group"}>
	                 								<label for={'registerUsername'} >Username</label>
	                  								<input type={"text"} className={"form-control"} id={'registerUsername'} aria-describedby={"Username"} name={'username'} />
	                							</div>
	                							<div className={"form-group"}>
	                 								<label for={'registerPassword'} >Password</label>
	                  								<input type={"password"} className={"form-control"} id={'registerPassword'}   aria-describedby={"Password"} name={'password'} />
	                							</div>
	                							<div className={"form-group"}>
	                  								<label for={'registerName'} >Name</label>
	                  								<input type={"text"} className={"form-control"} id={'registerName'} aria-describedby={"Name"} name={'user_name'} />
	                							</div>
	                							<div className={"form-group"}>
	                  								<label for={'registerPhoto'} >Photo</label>
	                  								<input type={"text"} className={"form-control"} id={'registerPhoto'}  aria-describedby={"Photo URL"} name={'user_photo'} defaultValue={'/img/defaultperson.png'}/>
	                							</div>
	                						</form>

	            							<div class="modal-footer">
	        									<button type={"button"} class={"btn btn-light"} data-dismiss={"modal"}>Close</button>
	        									<button type={"button"} id={'registerUser'} class={"btn btn-dark"}>Register</button>
	      									</div>
									    </div>
	    							</div>
	  							</div>
							</div>
				    	</div>
				    <script src={'/script/loginscript.js'} />
	        		<script src={"https://code.jquery.com/jquery-3.2.1.slim.min.js"} integrity={"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"} crossorigin={"anonymous"}></script>
          			<script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"} integrity={"sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"} crossorigin={"anonymous"}></script>
          			<script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"} integrity={"sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"} crossorigin={"anonymous"}></script>
        		</main>
      		</body>
        </html>   
    );
  }
}

module.exports = Login;