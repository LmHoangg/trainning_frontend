"use strict";
let username = document.getElementById("username");
let errorName = document.querySelector(".error-name");
const regexName =
  /^[a-zA-ZãáàảạẽéèẻẹũúùủụõóòỏọĩíìỉịẫấầẩậễếềểệữứừửựỗốồổộỹýỳỷỵẵắằẳặỡớờởợâăêôươÃÁÀẢẠẼÉÈẺẸŨÚÙỦỤÕÓÒỎỌĨÍÌỈỊẪẤẦẨẬỄẾỀỂỆỮỨỪỬỰỖỐỒỔỘỸÝỲỶỴẴẮẰẲẶỠỚỜỞỢÂĂÊÔƯƠs]{2,}$/;
let password = document.getElementById("password");
let errorPass = document.querySelector(".error-pass");
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z]).{8,32}$/;
let email = document.getElementById("email");
let errorEmail = document.querySelector(".error-email");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkRegex(e, regex) {
  return regex.test(e);
}
function checkError(val, error, regex) {
  if (!val.value) {
    error.innerHTML = "Can't be blank";
  } else if (!checkRegex(val.value, regex)) {
    error.innerHTML = "Not in the correct format";
  } else {
    error.innerHTML = "";
  }
  return value;
}
function Validate() {
  const userName = checkError(username, errorName, regexName);
  const passWord = checkError(password, errorPass, regexPassword);
  const emailAddress = checkError(email, errorEmail, regexEmail);
  if (userName === "" && passWord === "" && emailAddress === "") return false;
}
function addEvent(val, event, error, regex) {
  val.addEventListener(event, function (e) {
    checkError(val.value, error, regex);
  });
}
addEvent(username, "change", errorName, regexName);
addEvent(username, "blur", errorName, regexName);
addEvent(password, "change", errorPass, regexPass);
addEvent(password, "blur", errorPass, regexPass);
addEvent(email, "change", errorEmail, regexEmail);
addEvent(email, "blur", errorEmail, regexEmail);
