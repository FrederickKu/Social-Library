console.log('hello');
var addMessage = function() {
  if(event.keyCode === 13){

    var data = {
      message: this.value,
      request_id: this.id
    };

    this.value='';

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

    xmlhttp.addEventListener("load", function(){
      var messageDetails=JSON.parse(this.responseText);

      let div = document.createElement('div');
      div.className = 'owner-message';
      let message = document.createElement('p');
      message.innerText= messageDetails.message;

      div.appendChild(message);

      document.getElementById('chat-area').appendChild(div);
      document.getElementById('chat-area').scrollTop=document.getElementById('chat-area').scollHeight;

    });

    xmlhttp.open("POST", '/request/chat/' +this.id);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    xmlhttp.send(JSON.stringify(data));
  }
}

document.getElementsByClassName('chat-input')[0].onkeypress = addMessage;

var getMessages =function() {
    var id = document.getElementsByClassName('chat-input')[0].id;
    var responseHandler = function() {
      var messageDetails=JSON.parse(this.responseText);

      var currentChildren = document.getElementById('chat-area').children;

      if(currentChildren.length < messageDetails.messages.length){
        for (let i=currentChildren.length; i<messageDetails.messages.length; i++){
          if (messageDetails.messages[i].user_id === messageDetails.otheruser.id){
            let div = document.createElement('div');
            div.className = "other-message";

            let p1 = document.createElement('p');
            let span = document.createElement('span');
            span.innerText=messageDetails.otheruser.username;
            p1.appendChild(span);
            div.appendChild(p1);

            let p2 = document.createElement('p');
            p2.innerText=messageDetails.messages[i].message;

            div.appendChild(p2);

            document.getElementById('chat-area').appendChild(div);

          } else {
              let div = document.createElement('div');
              div.className = 'owner-message';
              let messageP = document.createElement('p');
              messageP.innerText= messageDetails.messages[i].message;

              div.appendChild(messageP);


              document.getElementById('chat-area').appendChild(div);
          }
        }
      }

      let height = document.getElementById('chat-area').scrollHeight;
      document.getElementById('chat-area').scrollTop=height;

      timeout();    
    };

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", "/request/chat/"+id);

    request.send();
}

function timeout() {
  setTimeout(getMessages,1000);
}

timeout()