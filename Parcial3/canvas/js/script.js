
//para cceder a la clase se necesita importar lo que se exporto
import { Cuadrado, Circulo, Linea, Sticker, Corazon, Borrador } from "./figuras.js";

const canvas = document.querySelector("#lienzo");

function ajustarCanvas() {
    // Ajustar tamaño real del canvas al tamaño de la ventana
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}

//obtener el contexto de donde se pueden crear los elementos, se encarga de tener los metodos para crear dicujos
const ctx = canvas.getContext("2d"); //ya se puede hacer uso de los diferentes metodos

//el arreglo donde se guardan los elementos que se van creando wuuuu pero solo para las figuras
let elementos = [];

//let historial = []; //aqui se guardan de nuevo todo lo que hace pero con la diferencia de que este guarda el borrador
let rehacerHistorial = [];//arreglo donde se va guardas los elementos que se borran para poder rehacerlos

/*function guardarEstado() {
    const estado = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historial.push(estado);

    //limitamos la cantidad de historial que pueda tener para que no explote xd 
    if (historial.length > 20) {
        historial.shift();
    }

    //cada vez que se hace algo nuevo se borra rehacer
    rehacerHistorial = [];
}*/



//asignar a los botonrs diferetnes estados
const opciones = {
    pincel: false,
    linea: false,
    circulo: false,
    cuadrado: false,
    corazon: false,
    borrador: false,
    sticker: false
}

//para guardar las coordenas del cursor, se define como un objeto
const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}

//una bandera para mostrar si el click esta presionado
let presionado = false;

canvas.addEventListener("mousedown", (event) => alPresionarClick(event))
canvas.addEventListener("mousemove", (event) => mientrasPresionaClick(event))
canvas.addEventListener("mouseup", (event) => alSoltarClick(event))

//para que se cambien entre las opciones que se escojan
document.querySelector("#pincel").addEventListener("click", () => { cambiarOpcion("pincel") });
document.querySelector("#linea").addEventListener("click", () => { cambiarOpcion("linea") });
document.querySelector("#cuadrado").addEventListener("click", () => { cambiarOpcion("cuadrado") })
document.querySelector("#circulo").addEventListener("click", () => { cambiarOpcion("circulo") })
document.querySelector("#corazon").addEventListener("click", () => { cambiarOpcion("corazon") })
document.querySelector("#borrador").addEventListener("click", () => { cambiarOpcion("borrador") })
document.querySelector("#sticker").addEventListener("click", () => { cambiarOpcion("sticker") })

//para saber si el boton esta activo o no, sin necesidad de cambiar de opcion de las 
// figuras, asi se mantiene la figura seleccionada
let rojo = false;
document.querySelector("#rojo").addEventListener("click", () => {
    //esto es para que al momento de dar click se vaya alternando entre que si esta activo o no
    rojo = !rojo;
    //se vuelve a renderizar el objeto para que se mantega el filtro mientras se crean mas figuras
    RenderizarElementos();
})
//Y ASI PARA LOS DEMAS FILTROS WUUUUU
let azul = false
document.querySelector("#azul").addEventListener("click", () => { azul = !azul; RenderizarElementos() })
let verde = false
document.querySelector("#verde").addEventListener("click", () => { verde = !verde; RenderizarElementos() })
let BN = false; //blanco y negro
document.querySelector("#filtroBN").addEventListener("click", () => { BN = !BN; RenderizarElementos() })
let sepia = false;
document.querySelector("#sepia").addEventListener("click", () => { sepia = !sepia; RenderizarElementos() })
let negativo = false;
document.querySelector("#negativo").addEventListener("click", () => { negativo = !negativo; RenderizarElementos() })

//botones de deshacer y rehacer con sus respectivas funciones al dar click
document.querySelector("#deshacer").addEventListener("click", () => { Deshacer() })
document.querySelector("#rehacer").addEventListener("click", () => { Rehacer() })

//este es el boton de limpiar que funciona con la funcion de limpiar xd
document.querySelector("#limpiar").addEventListener("click", () => { Limpiar() })

document.querySelector("#guardar").addEventListener("click", () => {
    RenderizarElementos();//para asegurar que todo se dibujo 
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");//el toDataURL es para convertirlo en imagen y el formato
    enlace.download = "dibujo_chido.png"; //el nombre con el que se descarga
    enlace.click(); //el que se haya creado la etiqueta de a y el click(), es para que se descargue sin abrir ptra pestaña
});

//para que se cambie el estado de las opciones al oprimir cada una
let clasearchivo = document.querySelector(".archivo")
function cambiarOpcion(opcion) {
    for (let clave in opciones) {
        opciones[clave] = false;
    }
    opciones[opcion] = true

    //para quitar clase activa a todos los botones (es el color para cuando se selecciona)
    document.querySelectorAll(".boton").forEach(boton => {
        boton.classList.remove("activo");
    });

    //se activa la clase a solo el botón seleccionado
    document.querySelector(`#${opcion}`).classList.add("activo");
    console.log(opciones[opcion])

    if (opcion === "sticker") {
        clasearchivo.classList.add("activo");
    }
    else { clasearchivo.classList.remove("activo") }
}

//para conseguir el valor del color de los input, en el constructor se puso
//  colorRelleno.value para que tomara es valor
let colorRelleno = document.querySelector("#colorRelleno");
// y sera igual para el color del borde
let colorLinea = document.querySelector("#colorBorde")
//e igual para el grosor de la linea xd
let grosorLinea = document.querySelector("#grosorPincel")

let rellenoActivo = document.querySelector("#rellenoActivo")
let bordeActivo = document.querySelector("#bordeActivo")

//para que los checkbox empiecen chekeados y con el relleno y borde activos
rellenoActivo.checked = true;
bordeActivo.checked = true;

//esto es para que se activen o desactiven segun el boton que esta chekeado sjsjsj
rellenoActivo.addEventListener("change", () => {
    if (rellenoActivo.checked) {
        colorRelleno.disabled = false;
        colorRelleno.value = "#000000"
    } else {
        colorRelleno.value = "#e7e7e7"
        colorRelleno.disabled = true;
    }
    RenderizarElementos()
});

bordeActivo.addEventListener("change", () => {
    if (bordeActivo.checked) {
        grosorLinea.disabled = false;
        colorLinea.disabled = false;
        colorLinea.value = "#000000"
    } else {
        colorLinea.value = "#e7e7e7"
        grosorLinea.disabled = true;
        colorLinea.disabled = true;
        grosorLinea.value = "0";
    }
    RenderizarElementos()
});

//aqui se guarda el url de la image que se selecciona desde el input
let imagenSeleccionada;
document.querySelector("#archivo").addEventListener("change", function (e) {
    const archivo = e.target.files[0];

    if (archivo) {
        const url = URL.createObjectURL(archivo);
        imagenSeleccionada = new Image();
        imagenSeleccionada.src = url; // guarda la imagen
        console.log(imagenSeleccionada);
        clasearchivo.classList.remove("activo")
    }
});

/*ctx.beginPath();
ctx.moveTo(230, 230);
ctx.lineTo(310, 310);
ctx.lineTo(310, 250);
ctx.quadraticCurveTo(500, 250, 500, 100);
ctx.quadraticCurveTo(350, 50, 290, 230);
ctx.lineTo(230, 230);
ctx.stroke();*/

//evento click y muestra las coordenadas en la consola
function detectarClick(event) {
    console.log(event.offsetX, " - ", event.offsetY);
    ctx.beginPath();
    ctx.fillRect(event.offsetX, event.offsetY, 100, 100);
}

function alPresionarClick(event) {
    console.log("se presiono el boton click en el lienzo")
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
}

let elemento = null;
function mientrasPresionaClick(event) {
    console.log("se mantiene el cursor en el lienzo")
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    let grosor = bordeActivo.checked ? Number(grosorLinea.value) : 0;
    let colorL = bordeActivo.checked ? colorLinea.value : "transparent";
    let colorR = rellenoActivo.checked ? colorRelleno.value : "transparent";

    if (presionado) { //para que se muestra mientras se mueve el mouse
        if (opciones.pincel) {

            //opcion para dibujar con el pincel
            const linea = new Linea({
                iniciales: {
                    x: posicionesCursor.iniciales.x,
                    y: posicionesCursor.iniciales.y
                },
                finales: {
                    x: posicionesCursor.finales.x,
                    y: posicionesCursor.finales.y
                }
            }, colorR, grosor);//para que tomer el color del input
            elementos.push(linea);

            //al finalizar el trazo de una linea le decimos que el punto inicial de la siguiente es el final
            posicionesCursor.iniciales.x = posicionesCursor.finales.x;
            posicionesCursor.iniciales.y = posicionesCursor.finales.y;
        }
        else if (opciones.linea) {
            //pcion para dibujar una linea
            elemento = new Linea({
                iniciales: {
                    x: posicionesCursor.iniciales.x,
                    y: posicionesCursor.iniciales.y
                },
                finales: {
                    x: posicionesCursor.finales.x,
                    y: posicionesCursor.finales.y
                }
            }, colorR, grosor);

        }
        else if (opciones.cuadrado) {
            //opciona para dibujar un cuadrado
            elemento = new Cuadrado(posicionesCursor, colorL, colorR, grosor) //para que el valor deje de ser un string y se convierta en un numero xd
        }
        else if (opciones.circulo) {
            //opcion para dibujar un circulo
            elemento = new Circulo(posicionesCursor, colorL, colorR, grosor);
        }
        else if (opciones.corazon) {
            //opcion para dibujar un corazon
            elemento = new Corazon(posicionesCursor, colorL, colorR, grosor);
        }
        else if (opciones.borrador) {

            /*ctx.globalCompositeOperation = "destination-out";//sirve para borrar en ves de dibujar
            ctx.beginPath();
            ctx.arc(event.offsetX, event.offsetY, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            return;//evita que se renderice y no se borre el borrador*/

            elemento = new Borrador({
                iniciales: {
                    x: posicionesCursor.iniciales.x,
                    y: posicionesCursor.iniciales.y
                },
                finales: {
                    x: posicionesCursor.finales.x,
                    y: posicionesCursor.finales.y
                }
            }, grosor);

            elementos.push(elemento);

            posicionesCursor.iniciales.x = posicionesCursor.finales.x;
            posicionesCursor.iniciales.y = posicionesCursor.finales.y;
        }
        else if (opciones.sticker) {
            //opcion para sticker
            elemento = new Sticker(posicionesCursor, imagenSeleccionada)
        }
        else {

        }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        RenderizarElementos()
        if (elemento) {
            elemento.Dibujar(ctx);
        }
    }
}

function alSoltarClick(event) {
    console.log("se solto el boton click en el lienzo")
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    let grosor = bordeActivo.checked ? Number(grosorLinea.value) : 0;
    let colorL = bordeActivo.checked ? colorLinea.value : "transparent";
    let colorR = rellenoActivo.checked ? colorRelleno.value : "transparent"

    if (opciones.pincel) {
        //opcion para dibujar con el pincel
        presionado = false;
    }
    else if (opciones.linea) {
        //pcion para dibujar una linea
        elemento = new Linea({
            iniciales: {
                x: posicionesCursor.iniciales.x,
                y: posicionesCursor.iniciales.y
            },
            finales: {
                x: posicionesCursor.finales.x,
                y: posicionesCursor.finales.y
            }
        }, colorR, grosor);
    }
    else if (opciones.cuadrado) {
        //opciona para dibujar un cuadrado
        elemento = new Cuadrado(posicionesCursor, colorL, colorR, grosor)
    }
    else if (opciones.circulo) {
        //opcion para dibujar un circulo
        elemento = new Circulo(posicionesCursor, colorL, colorR, grosor);
    }
    else if (opciones.corazon) {
        //opcion para dibujar un corazon
        elemento = new Corazon(posicionesCursor, colorL, colorR, grosor);
    }
    else if (opciones.borrador) {
        /*//opcion para el borrador
        guardarEstado();
        //CONVIERTE EL CANVAS EN UNA IMAGEN BASE
        const img = new Image();
        img.src = canvas.toDataURL();
        presionado = false;
        return;*/

        presionado = false;
    }
    else if (opciones.sticker) {
        //opcion para sticker
        if (imagenSeleccionada) { //vereficacion para crear el elemento si la imagen ha sido seleccionada
            elemento = new Sticker(posicionesCursor, imagenSeleccionada);
        }
        else {
            alert("selecciona una imagen");
        }
    }
    else { }
    //validacion para que se guarde cuando si hay un elemento
    if (elemento) {
        elementos.push(elemento);
    }
    console.log(elementos);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    RenderizarElementos();
    //guardarEstado();
    presionado = false;
}

//funcion para aplicar el filtro rojo
function FiltroRojo() {
    //filtro color rojo 
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        data[i] = rojo + 50;
        data[i + 1] = verde * .2;
        data[i + 2] = azul * .2;
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}

//funcion para aplicar el filtro verde
function FiltroVerde() {
    //filtro color verde 
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        data[i] = rojo * .2;
        data[i + 1] = verde + 30;
        data[i + 2] = azul * .2;
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}
//funcion para aplicar el filtro azul
function FiltroAzul() {
    //filtro color azul
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        data[i] = rojo * .2;
        data[i + 1] = verde * .2;
        data[i + 2] = azul + 10;
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}
//funcion para aplicar el filtro blanco y negro
function FiltroBN() {
    //filtro color blanco y negro
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        let gris = 0.3 * rojo + 0.59 * verde + 0.11 * azul;

        data[i] = gris;
        data[i + 1] = gris;
        data[i + 2] = gris;
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}
//funcion para aplicar el filtro rojo
function FiltroSepia() {
    //filtro color rojo 
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        data[i] = Math.min(0.393 * rojo + 0.769 * verde + 0.189 * azul, 255);
        data[i + 1] = Math.min(0.349 * rojo + 0.686 * verde + 0.168 * azul, 255);
        data[i + 2] = Math.min(0.272 * rojo + 0.534 * verde + 0.131 * azul, 255);
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}

function FiltroNegativo() {
    //filtro color negativo
    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) { //debe de saltar de a cuatro
        let rojo = data[i] // equivale a los valores de rojo
        let verde = data[i + 1] //verde 
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //alfa (transparencia)

        data[i] = 255 - rojo;
        data[i + 1] = 255 - verde;
        data[i + 2] = 255 - azul;
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
}

function Deshacer() { //para deshacer elementos
    if (elementos.length > 0) {
        const ultimo = elementos.pop(); // quita ultimo dibujo
        rehacerHistorial.push(ultimo); // se guarda en el arreglo rehacer
        RenderizarElementos();
    }
}

function Rehacer() { //rehacer los elementos
    if (rehacerHistorial.length > 0) {
        const recuperado = rehacerHistorial.pop(); //agarra lo ultimo que se quedo en el arreglo
        elementos.push(recuperado); //regrese el elemento al arreglo de elementos
        RenderizarElementos();
    }
}

//con esta funcion se renderizan los elementos y no se pierden al dibujar mas elementos
function RenderizarElementos() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    elementos.forEach(dibujo => {
        dibujo.Dibujar(ctx);
    })

    //al momneto de que se renderice tiene una validacion de que 
    //si el boton de filtro esta activo pone el filtro rojo en el canvas
    if (rojo) {
        FiltroRojo();
    } else if (verde) {
        FiltroVerde()
    } else if (azul) {
        FiltroAzul()
    } else if (negativo) {
        FiltroNegativo()
    } else if (sepia) {
        FiltroSepia()
    } else if (BN) {
        FiltroBN()
    } else {
    }
}

//funcion para limpiar el canvas
function Limpiar() {
    //deja el arreglo vacio
    elementos = []
    //se borra lo que tenia en el contexto
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

//para que la pagina inicialice con el pincel
cambiarOpcion("pincel");
//creo que tambien se puede hacer cuando finalice de cargar el DOM, para
// que no haya problemas al cargar pero se me fue como hacerlo jijijij
// se ajusta el canvas al cargar
ajustarCanvas();

// se ajusta al cambiar tamaño de la ventana
window.addEventListener('resize', ajustarCanvas);
