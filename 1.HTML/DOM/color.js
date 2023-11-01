var textElement = document.getElementById("myText");

function changeRed(){
  textElement.style.color='red';
}
function changeBlue(){
  textElement.style.color='blue';
}
function changeToggle(){
  var Toggle = document.getElementById("Toggle");

  if(textElement.style.color=='blue'){
    textElement.style.color='red'
    Toggle.innerText='Red토글'
  }
  else if(textElement.style.color=='red'){
    Toggle.innerText='Blue토글'
  textElement.style.color='blue';
  }
  else{
    textElement.style.color='red'
    Toggle.innerText='Red토글'
  }

}  
function addElements(){
  var div = document.createElement("div");
  var a = document.querySelector("#parent")
  div.textContent = "새로운 내용"
  a.appendChild(div);
}
function removeElements(){
  var element = document.querySelector("#parent")
  element.removeChild(div);
  // console.log(window.innerWidth, window.innerHeight)
}