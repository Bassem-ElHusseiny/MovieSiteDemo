const navbar=document.querySelector(".navbar");
const navbarOff=navbar.offsetTop;
window.onscroll=()=>{

     if (window.pageYOffset >navbarOff) {
      navbar.classList.add("navbarFixed")
    } else {
      navbar.classList.remove("navbarFixed");
    }


}

var menu = document.querySelector(".menu");

function trigger(e) {
  menu.classList.toggle("menu_trigg");
  e.firstElementChild.classList.toggle("trigger_1")
  e.lastElementChild.classList.toggle("trigger_2")
}

var search_trig=document.getElementById("search_trig");
var search=document.querySelector(".search");

function searchBar() {
  if( search.style.cssText===""){
    search_trig.classList.replace( "fa-magnifying-glass","fa-xmark");
  search.style.cssText="max-height:200px;opacity: 1;visibility:visible; margin:5px 0;";
  }
  else{
    search_trig.classList.replace("fa-xmark", "fa-magnifying-glass");
  search.style.cssText="";
}
}