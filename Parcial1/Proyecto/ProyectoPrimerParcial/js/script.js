const tri = document.querySelector("#tri");
const zelda = document.querySelector("#zelda");

window.addEventListener("scroll", ()=>{

    tri.style.bottom = window.scrollY *0.5 + "px";
    tri.style.right = window.scrollY *0.5 + "px";
    zelda.style.bottom = window.scrollY *0.1 + "px";
    
    
})

const cambio_color = document.querySelector("body");

window.addEventListener("scroll", ()=> {
  var movimiento_scroll = window.scrollY;
 
  if(movimiento_scroll >= 50){
    cambio_color.style.backgroundColor='#6594B1';
  }

 if(movimiento_scroll < 50){
    cambio_color.style.backgroundColor='#EEEEEE';
  }

  if(movimiento_scroll >= 400){
    cambio_color.style.backgroundColor='#EEEEEE';
  }

});