     window.onload = (event) => {
      function toDelete(x, url){
        x.addEventListener("click", function(){
          new swal({title : "Are you sure you want to delete",
          text: "Once deleted you will not be able to recover this record",
         icon : "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm, remove it",
          cancelButtonText: "No, cancel",
          dangerMode : true, 
        })
         .then((willDelete) =>  {
         
          if(willDelete){
              new swal( {text: " Your record has been deleted", 
              icon : "success", 
              showConfirmButton : false, 
              showCancelButton: false,
              closeOnClickOutside: false,});
              setTimeout( function(){
          location.assign(url  + id);
        }, 2000) 
         } 
         else{
          new swal( "Your record is Safe !!!")
         }
         })
         })
       }
        let edit = document.getElementById("edit");
        let edit2 = document.getElementById("edit2");
        var deletes2 = document.getElementById("delete2");
        var deletes = document.getElementById("delete");
        var data = document.getElementById("data");
       var name = data.getAttribute("data-name");
       var  id = data.getAttribute("data-id");
       var  stagename = data.getAttribute("data-stagename");
       var email = data.getAttribute("data-email");
       var  phone = data.getAttribute("data-phone");
       var address = data.getAttribute("data-address");
       var  province = data.getAttribute("data-province");
       var genre = data.getAttribute("data-genre");
       var  category = data.getAttribute("data-category");
       var language = data.getAttribute("language");
       var  facebook = data.getAttribute("data-facebook");
       var twitter = data.getAttribute("data-twitter");
       var  instagram = data.getAttribute("data-instagram");
       var  companyname = data.getAttribute("data-companyname");
       var  website = data.getAttribute("data-website");
       var app = data.getAttribute("data-app");
       console.log(id)
      if (deletes != null){
        toDelete(deletes, "/delete/");
      } else{
        toDelete(deletes2, "/orgdelete/");
      }
      if(edit != null) { 
      edit.addEventListener("click", function(){
        const person = {
          name : name,
          id : id,
          province: province,
          genre : genre,
          address: address,
          phone : phone,
          email: email,
          language: language,
          category: category,
          twitter: twitter,
          facebook : facebook,
          instagram: instagram,
          stagename: stagename,
          app:app,
        }
        window.localStorage.setItem('person', JSON.stringify(person));
        location.assign("/edit")
       })
      }
      else{
       edit2.addEventListener("click", function(){
        const person = {
          name : name,
          id : id,
          province: province,
          genre : genre,
          address: address,
          phone : phone,
          email: email,
          language: language,
          category: category,
          twitter: twitter,
          facebook : facebook,
          instagram: instagram,
          stagename: stagename,
          companyname: companyname,
          website : website,
        }
        window.localStorage.setItem('person', JSON.stringify(person));
        location.assign("/orgedit")
       })
      }
 }
   


 