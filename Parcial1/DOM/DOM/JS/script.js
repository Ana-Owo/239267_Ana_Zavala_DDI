let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;

function cambiarColor(color) {
    contenido.style.background = color;
}

function cambiarTamaño(ancho, alto){
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

function cambiarTamañoIntervalo(ancho){
    console.log("cambiar tamaño");
    contenido.style.width = ancho ;
}

//diferentes eventos de js
//diferentes usando adEventListener
//seleccionar uno de cada uno y realizar cualquier accion como cambiar colores, tamaño, contenido, etc.
//en total dos


if(bandera){
        cambiarTamañoIntervalo("600px")
        bandera = false;
    } else {
        cambiarTamañoIntervalo("800px")
        bandera = true;
    }

boton.addEventListener("click", ()=>{
    if(bandera){
        cambiarColor("white");
        cambiarTamaño("250px", "250px");
        bandera = false;
    } else {
        cambiarColor("blue");
        cambiarTamaño("500px", "500px");
        bandera = true;
    }
    
});

setInterval(cambiarTamañoIntervalo, 1000);
