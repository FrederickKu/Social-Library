 document.getElementById('account-setting-link').onclick = (function(){
 	document.getElementById('account_current_password').value = '';
 	document.getElementById('account_password').value = '';
 	document.getElementById('account_confirm_password').value='';
 	document.getElementById('incorrect-current').style.display='none';
	document.getElementById('incorrect-match').style.display='none';
 });



 var changePassword = function() {

  let data = {
    oldPassword: document.getElementById('account_current_password').value,
    newPassword: document.getElementById('account_password').value,
    confirmPassword: document.getElementById('account_confirm_password').value
  };

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.addEventListener("load", function(){

    if (this.responseText==='wrongmatch'){
       	document.getElementById('incorrect-current').style.display='none';
		document.getElementById('incorrect-match').style.display='none';
    	document.getElementById('incorrect-match').style.display='initial';
    }else if (this.responseText === 'wrongcurrent'){
    	document.getElementById('incorrect-current').style.display='none';
		document.getElementById('incorrect-match').style.display='none';
      	document.getElementById('incorrect-current').style.display='initial';
    } else if (this.responseText === 'success'){
      document.getElementById('successful-password').style.display='initial';
      document.getElementById('account-setting-form').style.display='none';
    }

  });

  xmlhttp.open("POST", '/changesettings');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


  xmlhttp.send(JSON.stringify(data));
}

document.getElementById('confirmChange').onclick=changePassword;

if(document.getElementsByClassName('notification-container').length>0){
  document.getElementById('red-circle').innerText = document.getElementsByClassName('notification-container').length;
  document.getElementById('red-circle').style.display='initial';
}