const url = "https://pokeapi.co/api/v2/pokemon";
//crear el objeto XMLHttpRequest es el objeto que se 
//encarga de hacer las peticiones de forma asicrona
const xhr = new XMLHttpRequest

//configuramos que tipo de peticion vamos a crear
//parametro 1 es el tipo de peticion
//parametro 2 es la url a donde se hara la peticion
xhr.open("GET", url, true) // parametro 3 true para que trabaje de forma asicrona

//establecemos la cabecera content-type para undicar que esperamos un json
xhr.setRequestHeader("Content-type", "application/json");

//es definir la funcion que se ejecutara cuando el estado de la peticion cuando cambie
xhr.onreadystatechange = ()=>{
    //verificamos el estado de la peticion 
    //0 = unset, 1= opened, 2 = header_recived, 3 = Loading, 4=done
    //verificamos que el estatus cambie a 4 y se complete
    if(xhr.readyState === 4 ){

        //verificamos si la respuesta feu exitosa (codigos 200 a 299)
        if(xhr.status >= 200 && xhr.status < 300){

            //hacemos una conversion de la respuesta a formato 
            //JSON poderlo convertir a un objeto de JS que podamos usar
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
        } else {
            //manejamos el error lo mostramos en consola 
            //en caso que el estatus de la respuesta no sea 200

            console.error("Error HTTP", xhr.status, xhr.statusText);
        }
    }
}
//definimos el manejo de errores en caso como conexion fallida, tiempo exedido de la peticion, etc.
xhr.onerror =()=>{

}

//definimos el metodo para manejar el tiempo de espera de la peticion
xhr.ontimeout=()=>{

}

//definimos el tiempo de espera maximo de la peticion ssi la petiicon tarda mas
xhr.timeout = 2000;

//enviamos la peticion como es get enviamos null,
//si fuera post o null enviariamos el cuerpo de la peticion 
xhr.send(null);


//elegir cualquier api (de gatitos) peticion fetch a esa api 
// y la informacion se muestre una vez que el usuario haya iniciado sesion, 
// que aparezca las tarjetas con la informacion, puede ser con una pagina nueva