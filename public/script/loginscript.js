console.log('hello');

document.getElementById('register').onclick= (function(){
    document.getElementById('registerForm').style.display='initial';
    document.getElementById('registerUser').style.display='initial';
    document.getElementById('registerSuccess').style.display='none';
    document.getElementById('registerFailure').style.display='none';
    document.getElementById('registerUsername').value='';
    document.getElementById('registerPassword').value='';
    document.getElementById('registerName').value='';
}
);

var register = function() {

  let data = {
    username: document.getElementById('registerUsername').value,
    password: document.getElementById('registerPassword').value,
    user_name: document.getElementById('registerName').value,
    user_photo: document.getElementById('registerPhoto').value
  };

  console.log(JSON.stringify(data));

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.addEventListener("load", function(){

    if (this.status===200){
      document.getElementById('registerForm').style.display='none';
      document.getElementById('registerUser').style.display='none';
      document.getElementById('registerSuccess').style.display='initial';
    } else{
      document.getElementById('registerFailure').style.display='initial';
    }

  });

  xmlhttp.open("POST", '/register');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


  xmlhttp.send(JSON.stringify(data));

}

document.getElementById('registerUser').onclick = register;
