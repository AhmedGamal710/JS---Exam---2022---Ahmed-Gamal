// sideNav 
 let click=document.getElementsByClassName("click");
    
     click[0].addEventListener("click",function(){
         if($(".click").attr("id")=="open-icon"){
            open();
        
         }else if($(".click").attr("id")=="close-icon"){
           
            close()
          
         }
     })
     // open Click
 function open(){         

    $(".click").removeClass(["fas","fa-bars"])
    $(".click").addClass(["fa","fa-align-justify","fa-times"])
    $(".click").attr("id","close-icon");

    $(".sidenav-footer p").fadeIn(500);
    $(".sidenav-footer .icons i").fadeIn(500);
    $(".sidenav-fixed-part").animate({
        width:"250px"
    })
    $(".sidenav-slider").animate({
        marginRight:"250px"
    }
    ,500,function(){       
        $(".playing-link").fadeIn(0.000000000001)
        .animate({top:20}, function() {
            $(".popular").fadeIn(0.000000000001)
            .animate({top:60}, function() {
                $(".top-rated").fadeIn(0.000000000001)
                .animate({top:100}, function() {
                    $(".trending").fadeIn(0.000000000001)
                    .animate({top:140}, function() {
                        $(".upcoming").fadeIn(0.000000000001)
                        .animate({top:180}, function() {
            $(".contact").fadeIn(0.000000000001)
            .animate({top:220})
                        });
                    });
                });
            });
        });


    })
    
  
}

 //close Click
function close(){             
    $(".click").removeClass(["fa","fa-align-justify","fa-times"])
    $(".click").addClass(["fas","fa-bars"])
    $(".click").attr("id","open-icon"); 
  
    $(".sidenav-fixed-part").animate({
        width:"0px"
    },1000)
    $("a").animate({top:1000},800)
    $(".sidenav-footer p").hide(800);
    $(".sidenav-footer .icons i").hide(800);
    $(".sidenav-slider").animate({
        marginleft:"0"
    }
    ,500)
 }
// end jQuery
let pooster=document.getElementById("pooster");
let apiDivs=document.getElementById("api-divs");
let trending=document.getElementById("trending");
let upComing=document.getElementById("upComing");
let nowPlaying=document.getElementById("nowPlaying");
let popular=document.getElementById("popular");
let topRated=document.getElementById("topRated");
let searchApi=document.getElementById("searchApi");
let searchResult=document.getElementById("searchResult");
let currentSearchInput=document.getElementById("currentSearchInput");
let apiLink=document.getElementsByClassName("link");
let alertMovieInput=document.getElementById("alertMovieInput");
let data=[];
async function upComingandTrendingData(url){
    let fetchData= await fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
    if(fetchData.ok==true){
    data=await fetchData.json();
    data=data.results;
    display()}
    
}
upComingandTrendingData("now_playing")
for(let i=0; i<apiLink.length; i++){
    apiLink[i].addEventListener("click",function(e){
        upComingandTrendingData(e.target.id)
    })
}
async function search(klma){
    let fetchData= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e633cc0382e6f1221d9516bc5730034a&language=en-US&query=${klma}&page=1&include_adult=false`);

    if(fetchData.status!=200){
        alertMovieInput.classList.remove("d-none");
    
    }
    data=await fetchData.json();
    data=data.results;
    display()
    
    
}
searchApi.addEventListener("keyup",function(){
    if(searchApi.value!=""){
    search(`${searchApi.value}`)}
})
let currentdata=[];
let dataArr=[];
function currentDateSearch(searchWord){
    let cartona=``;
  for(let i=0; i<data.length; i++){
      if(data[i].title.includes(searchWord)){
        cartona +=`
        <div class="col-lg-4 position-relative">
        <div class="single-div">
          <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="image" class="w-100 h-100 img" id="pooster">
          <div class="hover">
            <h2>${data[i].title}</h2>
            <p>${data[i].overview}</p>
            <p>rate: ${data[i].vote_average}</p>
            <p>released Date: ${data[i].release_date}</p>
          </div>
        </div>
           </div>
        `
        currentdata.push(data[i])
      }

     
  }

if(cartona.length!=0){
  searchResult.innerHTML=cartona}
  else{
      console.log(currentdata)
    for(let i=0; i<currentdata.length-1; i++){
       cartona +=`
       <div class="col-lg-4 position-relative">
       <div class="single-div">
         <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="image" class="w-100 h-100 img" id="pooster">
         <div class="hover">
           <h2>${data[i].title}</h2>
           <p>${data[i].overview}</p>
           <p>rate: ${data[i].vote_average}</p>
           <p>released Date: ${data[i].release_date}</p>
         </div>
       </div>
          </div>
       `
    }
    searchResult.innerHTML=cartona  
 } 
}
currentSearchInput.addEventListener("keyup",function(){
    if(currentSearchInput.value!=""){
        currentDateSearch(currentSearchInput.value);
    }
})
trending.addEventListener("click", async function(){
    let fetchData= await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=e633cc0382e6f1221d9516bc5730034a");
    if(fetchData.ok==true){
    data=await fetchData.json();
    data=data.results;
    display()}
})
function display(){
    let dataArray=data;
    let cartona=``;
    for(let i=0; i<dataArray.length; i++){
 
        cartona +=`
        <div class="col-lg-4 position-relative">
        <div class="single-div">
          <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="image" class="w-100 h-100 img" id="pooster">
          <div class="hover ">
            <h2>${data[i].title}</h2>
            <p>${data[i].overview}</p>
            <p>rate: ${data[i].vote_average}</p>
            <p>released Date: ${data[i].release_date}</p>
          </div>
        </div>
           </div>

        `
    }
    apiDivs.innerHTML=cartona;
}
// Validation 
 let NameInput=document.getElementById("NameInput");
  let NameEmail=document.getElementById("NameEmail");
  let phoneInput=document.getElementById("phoneInput");
  let ageInput=document.getElementById("ageInput");
  let passwordInput=document.getElementById("passwordInput");
  let repassInput=document.getElementById("repassInput");
  let alertInput=document.getElementById("alertNameInput");
   let alertEmailInput=document.getElementById("alertEmailInput");
   let alertPhoneInput=document.getElementById("alertPhoneInput");
   let alertAgeInput=document.getElementById("alertAgeInput");
   let alertPasswordInput=document.getElementById("alertPasswordInput");
   let alertrePasswordInput=document.getElementById("alertrePasswordInput");
  function NameInputvalidation(){
      let regex=/[A-Za-z0-9]/;
      let test=regex.test(NameInput.value);
      if(test){
        alertInput.classList.add("d-none");
          return true;
      }else{
        alertInput.classList.remove("d-none");
          return false;
      }
  }

NameInput.addEventListener("keyup",function(){
    console.log(NameInputvalidation())
    
})

function NameEmailvalidation(){
    let regax=/[a-zA-Z0-9 ](@){1}[a-z0-9 ](.){1}[a-zA-Z]{3}/;
    let test=regax.test(NameEmail.value);
    console.log(test)
    if(test){
      alertEmailInput.classList.add("d-none");
        return true;
    }else{
      alertEmailInput.classList.remove("d-none");
        return false;
    }
}

NameEmail.addEventListener("keyup",function(){
    if(NameInput.value==""){
        alertInput.classList.remove("d-none");
    }
    console.log(NameEmailvalidation())
})

function agevalidation(){
    let regax=/^100$|^[1-9]{1}[0-9]{0,1}$/;
    let test=regax.test(ageInput.value);
    if(test){
      alertAgeInput.classList.add("d-none");
      console.log(test)
        return true;
    }else{
      alertAgeInput.classList.remove("d-none");
      console.log(test)
        return false;
    }
}

ageInput.addEventListener("keyup",function(){
    if(NameInput.value==""){
        alertInput.classList.remove("d-none");
    }
    agevalidation();
})


function phoneValidation(){
    let regax=/[0-9]{10,}$/;
    let test=regax.test(phoneInput.value);
    if(test){
      alertPhoneInput.classList.add("d-none");
      console.log(test)
        return true;
    }else{
      alertPhoneInput.classList.remove("d-none");
      console.log(test)
        return false;
    }
}

phoneInput.addEventListener("keyup",function(){
    if(NameInput.value==""){
        alertInput.classList.remove("d-none");
    }
    phoneValidation();
})


function passwordValidation(){
    let regax=/[a-zA-Z0-9 @#$%^&*]{8,20}/;
    let test=regax.test(phoneInput.value);
    if(test){
      alertPasswordInput.classList.add("d-none");
      console.log(test)
        return true;
    }else{
      alertPasswordInput.classList.remove("d-none");
      console.log(test)
        return false;
    }
}

passwordInput.addEventListener("keyup",function(){
    if(NameInput.value==""){
        alertInput.classList.remove("d-none");
    }
    passwordValidation();
})


function repasswordValidation(){
    let regax=/[a-zA-Z0-9 @#$%^&*]{8,20}/;
    let test=regax.test(phoneInput.value);
    if(test){
     alertrePasswordInput.classList.add("d-none");
      console.log(test)
        return true;
    }else{
     alertrePasswordInput.classList.remove("d-none");
      console.log(test)
        return false;
    }
}


repassInput.addEventListener("keyup",function(){
    if(NameInput.value==""){
        alertInput.classList.remove("d-none");
    }
    repasswordValidation();
})


