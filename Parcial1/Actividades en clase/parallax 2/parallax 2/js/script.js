const titulo = document.querySelector("#titulo");
const kolog =document.querySelector("#kolog");

window.addEventListener("scroll", ()=>{

    //console.log(window.scrollY);

    titulo.style.right = window.scrollY *2 + "px";
    kolog.style.bottom = window.scrollY *2 + "px";
    
})