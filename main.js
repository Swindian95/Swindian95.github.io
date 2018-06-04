$(document).ready(function() {
  var element = document.getElementById("errormessage");
  element.classList.add("invisible");
  var element = document.getElementById("userError");
  element.classList.add("invisible");
  var element = document.getElementById("pwError");
  element.classList.add("invisible");
});


function nextSlide(container,index){
  var slideEvent = document.getElementById(container);
  var length = slideEvent.children.length;
  slideEvent.style.transform = "translate(" + (index/length)*-100 + "%, 0)";
}


function lastSlide(container,index){
  var slideEvent = document.getElementById(container);
  var length = slideEvent.children.length;
  slideEvent.style.transform = "translate(" + (index/length)*-100 + "%, 0)";
}


function checkIfEmptyUser(event){
  if(event.target.value === ""){
    event.target.parentElement.classList.add("error");
    var element = document.getElementById("userError");
    element.classList.remove("invisible");
  }else{
    event.target.parentElement.classList.remove("error");
    var element = document.getElementById("userError");
    element.classList.add("invisible");
  }
}

function checkIfEmptyPw(event){
  if(event.target.value === ""){
    event.target.parentElement.classList.add("error");
    var element = document.getElementById("pwError");
    element.classList.remove("invisible");
  }else{
    event.target.parentElement.classList.remove("error");
    var element = document.getElementById("pwError");
    element.classList.add("invisible");
  }
}

function logIn(event){
event.preventDefault();

  var xhttp = new XMLHttpRequest();
  var url = "users.json";
  var form = document.forms.credentialsForm;

  if(form.username.value === ""){
    var element = document.getElementById("userError");
    element.classList.remove("invisible");
    element.parentElement.classList.add("error");
  }

  if(form.password.value === ""){
    var element = document.getElementById("pwError");
    element.classList.remove("invisible");
    element.parentElement.classList.add("error");
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);

      if(checkUser(response)){
        lastSlide("loginwrapper", 2);
      }else{
        var element = document.getElementById("errormessage");
        element.classList.remove("invisible");
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function checkUser(response){
  var form = document.forms.credentialsForm;
    for(var i = 0; i < response.length; i++){
      var user = response[i];
      if(form.username.value === user.username && form.password.value === user.password){
        return true;
      }
    }
    return false;
}
