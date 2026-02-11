const caja = document.getElementById("cajaM1");
const caja2 = document.getElementById("cajaM2");

caja.addEventListener("mousemove", function(event) {
caja.style.backgroundColor = "yellow";
caja.style.height = "250px";
});

caja.addEventListener("mouseout", function(event) {
caja.style.backgroundColor = "white";
caja.style.height = "200px";
});

caja2.addEventListener("mousemove", function(event) {
caja2.style.backgroundColor = "blue";
caja2.style.height = "250px";
});

caja2.addEventListener("mouseout", function(event) {
caja2.style.backgroundColor = "black";
caja2.style.height = "200px";
});



const boton = document.querySelector("#boton");

boton.addEventListener("click", (event) => {
  boton.value = `Numero de clicks que has hecho: ${event.detail}`;
});


const sol = document.querySelector("#sol");
const copos = document.querySelector("#copos");
const cuadro = document.querySelector(".parallax");

window.addEventListener("scroll", ()=>{

    sol.style.bottom = window.scrollY *0.5 + "px";
    copos.style.bottom = window.scrollY *-0.5 + "px";
    
    
})

const cuadroS = document.querySelector("#cuadro");

window.addEventListener("scroll", ()=> {
  var scrollTop = window.scrollY;
 
  if(scrollTop >= 50){
    cuadroS.style.backgroundColor='#C20000';
  }

 if(scrollTop < 50){
    cuadroS.style.backgroundColor='#000000';
  }

});