//PROGRAMACION ASINCRONA

//callback
/*setTimeout(()=>{
    console.log("esto es un callback");
}, 1000); //el tiempo que se ejecuta*/

console.log("Este console log es el final del codigo");


//propio metedo para definir los callbacks

class Usuario{
    constructor(nombre, correo){
        this.nombre = nombre;
        this.correo = correo;
    }
    callback(funcion){
        if(typeof funcion === "function"){
            console.log("Este es el callback dentro de usuario")
            funcion(this.nombre, this.correo)
        }
    }
}

const usuarioActual = new Usuario("ana", "a@gmail.com");

usuarioActual.callback((nombre, correo)=>{
    console.log("Esta es la funcion que envio al usuario actual:", nombre, correo);
})