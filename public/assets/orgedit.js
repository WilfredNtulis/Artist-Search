var person =  JSON.parse(window.localStorage.getItem('person'))
window.onload = (event) => {
  var cat = document.getElementById("categories");
  var form = document.getElementById("form");
  form.setAttribute("action", "/orgedit/" + person.id)
 console.log(person)
  var fName = person.name
  var fulName = fName.split(" ");
  var iName = fulName[0];
  var iSurname = fulName[1];
var name = document.getElementsByName("name")[0];
var surname = document.getElementsByName("surname")[0];
name.setAttribute("value", iName);
surname.setAttribute("value", iSurname)
document.getElementsByName("companyname")[0].setAttribute("value", person.companyname)
document.getElementsByName("email")[0].setAttribute("value", person.email)
let category = document.getElementsByName("category")[0] 
category.value = person.category
let province =  document.getElementsByName("province")[0]
province.value = person.province
document.getElementsByName("twitter")[0].setAttribute("value", person.twitter)
document.getElementsByName("facebook")[0].setAttribute("value", person.facebook)
document.getElementsByName("instagram")[0].setAttribute("value", person.instagram)
document.getElementsByName("phone")[0].setAttribute("value", person.phone)
document.getElementsByName("address")[0].setAttribute("value", person.address)
document.getElementsByName("website")[0].setAttribute("value", person.website)
}