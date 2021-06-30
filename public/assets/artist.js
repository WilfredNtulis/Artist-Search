
var list = document.querySelectorAll('.list');
list.forEach(function(list){
    list.addEventListener('click', function(){
  fetch('http://localhost:3000/test')
  .then(response => response.json())
  .then(json => console.log(json))
    })
})
