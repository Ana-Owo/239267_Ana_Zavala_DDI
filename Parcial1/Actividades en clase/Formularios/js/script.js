const nombre = document.querySelector("#input-txt-nombre");
const apellido = document.querySelector("#input-txt-apellido");
const botonG = document.querySelector("#botonGuardar");

botonG.addEventListener("click", (e)=>{

    e.preventDefault();
    console.log(e.target.value);
    //se crea un nuevi objeto usuario
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);

    //metodo del objeto document que se encarga de crear elementos
    const nombre_info = document.createElement("h2");

    //llena la etiqueta h2 de informacion 
    nombre_info.textContent = usuario.nombre;

    //anidar a un elemento html en este caso al body
    document.body.appendChild(nombre_info);

});

class Usuario{
    constructor (nom, ape){
        this.nombre = nom;
        this.apellido = ape;
    }
}

