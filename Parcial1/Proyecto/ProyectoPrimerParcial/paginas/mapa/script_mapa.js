const boton1 = document.querySelector("#boton1");
const boton2 = document.querySelector("#boton2");

window.addEventListener("load", ()=>{
    boton1.style.background = "#0f1c25";
    bebidas.style.opacity = "1";
    jefes.style.opacity = "1";
    tesoros.style.opacity = "1";
});

/*La M es igual marcador, js para botones mostrar y ocultar*/
const bebidas = document.querySelector(".Mbebidas");
const jefes = document.querySelector(".Mjefes");
const tesoros = document.querySelector(".Mtesoros");

boton1.addEventListener("click", ()=>{
    boton1.style.background = "#0f1c25";
    bebidas.style.visibility = "visible";
    bebidas.style.opacity = "1";
    jefes.style.visibility = "visible";
    jefes.style.opacity = "1";
    tesoros.style.visibility = "visible";
    tesoros.style.opacity = "1";

    boton2.style.background = "#213C51"
});

boton2.addEventListener("click", ()=>{
    boton2.style.background = "#0f1c25";
    bebidas.style.visibility = "hidden";
    bebidas.style.opacity = "0";
    jefes.style.visibility = "hidden";
    jefes.style.opacity = "0";
    tesoros.style.visibility = "hidden";
    tesoros.style.opacity = "0";

    boton1.style.background = "#213C51"
    Bbebidas.style.background="#eeeeee"
    Bjefes.style.background="#eeeeee"
    Btesoros.style.background="#eeeeee"
});


/*B es igual a boton, js para los botones de bebidas jefes y tesoros */
const Bbebidas =document.querySelector(".bebidas");
const Bjefes =document.querySelector(".jefes");
const Btesoros =document.querySelector(".tesoros");

Bbebidas.addEventListener("click", ()=>{
    Bbebidas.style.background="#a3a3a3"
    bebidas.style.visibility = "visible";
    bebidas.style.opacity = "1";

    jefes.style.visibility = "hidden";
    jefes.style.opacity = "0";
    tesoros.style.visibility = "hidden";
    tesoros.style.opacity = "0";

    Bjefes.style.background="#eeeeee"
    Btesoros.style.background="#eeeeee"
    boton1.style.background = "#213C51"
    boton2.style.background = "#213C51"

})

Bjefes.addEventListener("click", ()=>{
    Bjefes.style.background="#a3a3a3"
    jefes.style.visibility = "visible";
    jefes.style.opacity = "1";

    bebidas.style.visibility = "hidden";
    bebidas.style.opacity = "0";
    tesoros.style.visibility = "hidden";
    tesoros.style.opacity = "0";

    Bbebidas.style.background="#eeeeee"
    Btesoros.style.background="#eeeeee"
    boton1.style.background = "#213C51"
    boton2.style.background = "#213C51"

})

Btesoros.addEventListener("click", ()=>{
    Btesoros.style.background="#a3a3a3"
    tesoros.style.visibility = "visible";
    tesoros.style.opacity = "1";

    jefes.style.visibility = "hidden";
    jefes.style.opacity = "0";
    bebidas.style.visibility = "hidden";
    bebidas.style.opacity = "0";
    
    Bbebidas.style.background="#eeeeee"
    Bjefes.style.background="#eeeeee"
    boton1.style.background = "#213C51"
    boton2.style.background = "#213C51"

})