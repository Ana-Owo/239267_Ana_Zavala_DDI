/*function LeerArchivo(event) {
    //console.log(event.target.files[0]); //el cero para ver el elemento en la posicion 0
    const archivo = event.target.files[0] //para almacenarlo en una variable
    console.log(archivo.type)

    if (archivo) {
        if (archivo.type === "image/jpeg") {
            const lectorArchivo = new FileReader();
            //onload cuando ya esta todo el archivo cargado
            lectorArchivo.onload = function (elemento) { // se le manda un elemento como parametro
                const url_imagen = elemento.target.result; // este contenido es el url
                const imagen = new Image();
                //const imagen = document.querySelector("#imagenSeleccionada") 
                //este funcionada con la etiqueta de img creada desde el html
                imagen.src = url_imagen;
                document.body.appendChild(imagen);


            }

            //elDataURL es para que lea la url del archivo
            //se utiliza el metodo readAText para leer todo el resultado para ser entendio como un objeto dentro de js
            lectorArchivo.readAsDataURL(archivo)
        } else {
            console.log("tipo de archivo invalido");
        }
    } else {
        console.log("no se leyó el archivo");
    }

}*/
//EN LA CONSOLA
//dentro de evento esta target que almacena los archivos, en los files da los
// detalles de la imagen el cual servira para obtenerlos



//PARA HACER UNA PROMESA
//funcion para leer el archivo que resiva el archivo que quiere leer y retornar la promesa

document.querySelector("#input-imagen").addEventListener("change", (event) => {
    const url = leerArchivo(event.target.files[0])
    url.then((dato) => {
        const imagen = new Image();
        imagen.src = dato;
        document.body.appendChild(imagen);
    }).catch(
        ()=>{
            console.log("algo salio mal");
        }
    )
});

function leerArchivo(archivo) {
    return new Promise((resolve, reject) => {// se tiene que mandar tambien el archivo
        if (archivo) {
            if (archivo.type === "image/jpeg" || archivo.type === "image/png" || archivo.type === "image/webp") {
                const lectorArchivo = new FileReader();

                lectorArchivo.onload = (elemento) => {
                    const url_imagen = elemento.target.result;
                    resolve(url_imagen);
                }
                lectorArchivo.readAsDataURL(archivo)
            } else {
                reject();
            }
        } else {
            reject();
        }
    });
}