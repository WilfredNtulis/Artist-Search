var person =  JSON.parse(window.localStorage.getItem('person'))
window.onload = (event) => {
  var cat = document.getElementById("categories");
  var form = document.getElementById("form");
  form.setAttribute("action", "/edit/" + person.id)

  let genre = document.getElementsByName("genre")[0]

  var arrays = {
    Poem : "Poem",
    Comedy : "Comedy",
    SunguraMuseve:"Sungura/Museve",
    Tshibilika:"Tshibilika",
    Imbube:"Imbube",
    Maskandi:"Maskandi",
    Traditional:"Traditional",
    Gospel:"Gospel",
    AfroPop:"Afro Pop",
    AfroSoul:"Afro Soul",
    Kwaito:"Kwaito",
    House:"House",
    HipHop:"Hip Hop",
    ZimDancehall:"Zim Dancehall",
    Rhumba:"Rhumba",
    AfroJazz:"Afro Jazz",
    Jazz:"Jazz",
    "Rythm and Blues(RnB)":"Rythm and Blues(RnB)",
    Contemporary : "Contemporary Dance",
    Tradional : "Tradional Dance",
    BreakDance : "Break Dance",
    "2 Dimension" : "2 Dimension",
    "3 Dimension ":"3 Dimension",
    "Mixed Media" : "Mixed Media",
    Sculpting : "Sculpting",
    Painting : "Painting",
    Fiction: "Fiction",
  Anthology : "Anthology",
  Children : "Children",
  Actors : "Actors", 
    Actresses : "Actresses",
    Directors : "Directors",
    Producers : "Producers",
    "Music Video Director" : "Music Video Director"


   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}





  console.log(person)
  var fName = person.name
  var fulName = fName.split(" ");
  var iName = fulName[0];
  var iSurname = fulName[1];
var name = document.getElementsByName("name")[0];
var surname = document.getElementsByName("surname")[0];
name.setAttribute("value", iName);
surname.setAttribute("value", iSurname)
document.getElementsByName("address")[0].setAttribute("value", person.address)
document.getElementsByName("email")[0].setAttribute("value", person.email)
let category = document.getElementsByName("category")[0] 
category.value = person.category
genre.value = person.genre
let province =  document.getElementsByName("province")[0]
province.value = person.province
document.getElementsByName("twitter")[0].setAttribute("value", person.twitter)
document.getElementsByName("facebook")[0].setAttribute("value", person.facebook)
document.getElementsByName("instagram")[0].setAttribute("value", person.instagram)
document.getElementsByName("phone")[0].setAttribute("value", person.phone)
document.getElementsByName("address")[0].setAttribute("value", person.address)
document.getElementsByName("stagename")[0].setAttribute("value", person.stagename)
document.getElementsByName("language")[0].setAttribute("value", person.language)
document.getElementsByName("app")[0].setAttribute("value", person.app)


var language = document.getElementById("language")

cat.addEventListener("change", function(){
 console.log(cat.value)

 if(cat.value == "Spoken Word"){
  genre.options.length =0; 
  language.setAttribute("type", "hidden")
  var arrays = {
    Poem : "Poem",
    Comedy : "Comedy"
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}

else if(cat.value == "Dance Choreographers" || cat.value == "Dance groups/ Ensembles" || cat.value == "Dancers"){
  language.setAttribute("type", "hidden")
  genre.options.length =0;
  var arrays = {
    Contemporary : "Contemporary Dance",
    Tradional : "Tradional Dance",
    BreakDance : "Break Dance"
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
 
}

else if(cat.value == "Visual Arts"){
  language.setAttribute("type", "hidden")
  genre.options.length =0;
  var arrays = {
    "2 Dimension" : "2 Dimension",
    "3 Dimension ":"3 Dimension",
    "Mixed Media" : "Mixed Media",
    Sculpting : "Sculpting",
    Painting : "Painting",
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}

else if(cat.value == "Literary"){
  genre.options.length =0;
  language.setAttribute("type", "text")
 
 var arrays = {
  Fiction: "Fiction",
  Anthology : "Anthology",
  Children : "Children"
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}

else if(cat.value == "Theatre"){
  language.setAttribute("type", "hidden")
  genre.options.length =0;
  var arrays = {
                  Actors : "Actors", 
                  Actresses : "Actresses",
                  Directors : "Directors",
                  Producers : "Producers",
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}
else if(cat.value == "Film and Television"){
  language.setAttribute("type", "hidden")
  genre.options.length =0;
  var arrays = {
                  Actors : "Actors", 
                  Actresses : "Actresses",
                  Directors : "Directors",
                  Producers : "Producers",
                  "Music Video Director" : "Music Video Director"
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}

else if(cat.value == "Music"){
  language.setAttribute("type", "hidden")
  genre.options.length =0;
  var arrays = {
                      SunguraMuseve:"Sungura/Museve",
                      Tshibilika:"Tshibilika",
                      Imbube:"Imbube",
                      Maskandi:"Maskandi",
                      Traditional:"Traditional",
                      Gospel:"Gospel",
                      AfroPop:"Afro Pop",
                      AfroSoul:"Afro Soul",
                      Kwaito:"Kwaito",
                      House:"House",
                      HipHop:"Hip Hop",
                      ZimDancehall:"Zim Dancehall",
                      Rhumba:"Rhumba",
                      AfroJazz:"Afro Jazz",
                      Jazz:"Jazz",
                      "Rythm and Blues(RnB)":"Rythm and Blues(RnB)",
   } 
for (index in arrays){
genre.options[genre.options.length] = new Option(arrays[index], index)
}
}
})
}