
let header  = document.querySelector('header');
let menu = document.querySelector("#icon-menu");
let navbar = document.querySelector(".navbar");


window.addEventListener('scroll', ()=>{
    header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');

}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let darkmode= document.querySelector("#darkmode");

//darkmode.onclick = () => {
  //  if (darkmode.classList.contains("bx-sun")){
    //    darkmode.classList.replace("bx-sun","bx-moon");
    //    document.body.classList.add("active");
    //}else{
    //    darkmode.classList.replace("bx-moon","bx-sun");
    //    document.body.classList.remove("active");
  //  }
// }

const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () =>{

    document.body.classList.toggle('active');

});