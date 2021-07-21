function toggleShowHide(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.style.display == "none")
            element.style.display = "inline";
        else
            element.style.display = "none";
    }
}
  
  window.onload = (event) => {
   var tab1 = document.getElementById("tab1") 
   var tab2 = document.getElementById("tab2")
   tab2.style.display = "none"
  
   var tab1but = document.getElementById("tab1but")
   var tab2but = document.getElementById("tab2but")
   tab1but.addEventListener("click", function(){
    tab2.style.display = "none"
    tab1.style.display = "block"
    
    
   })
   tab2but.addEventListener("click", function(){
     tab1.style.display = "none"
     tab2.style.display = "block"
      })
   var cat = document.getElementById("categories");
   var language = document.getElementById("language")
   var genre = document.getElementById("genres") 
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