
//movimiento y transparencia de la cuadricula de los personajes
const contenedormovimiento = document.querySelector(".contenedor_grid2");

window.addEventListener("load", ()=>{
    contenedormovimiento.style.bottom = -45 + "%";   
    contenedormovimiento.style.opacity = "1";
    
});

//escala de los personajes con mousemove
const zelda = document.querySelector("#zelda2");
zelda.addEventListener("mousemove", ()=>{
    zelda.style.width = "13vw";
});
zelda.addEventListener("mouseout", ()=>{
    zelda.style.width = "12vw";
});

const tri = document.querySelector("#tri2");
tri.addEventListener("mousemove", ()=>{
    tri.style.width = "13vw";
});
tri.addEventListener("mouseout", ()=>{
    tri.style.width = "12vw";
});

const link = document.querySelector("#link");
link.addEventListener("mousemove", ()=>{
    link.style.width = "13vw";
});
link.addEventListener("mouseout", ()=>{
    link.style.width = "12vw";
});

const impa = document.querySelector("#impa");
impa.addEventListener("mousemove", ()=>{
    impa.style.width = "13vw";
});
impa.addEventListener("mouseout", ()=>{
    impa.style.width = "12vw";
});

const ganon = document.querySelector("#ganon");
ganon.addEventListener("mousemove", ()=>{
    ganon.style.width = "13vw";
});
ganon.addEventListener("mouseout", ()=>{
    ganon.style.width = "12vw";
});

const gatito = document.querySelector("#gatito");
gatito.addEventListener("mousemove", ()=>{
    gatito.style.width = "13vw";
});
gatito.addEventListener("mouseout", ()=>{
    gatito.style.width = "12vw";
});