const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton_guardar = document.querySelector("#boton_guardar");



const formulario = document.querySelector("#form_2");



const Usuarios = [
    {
        nombre: "Ana",
        apellido: "Zavala",
        correo: "ana.zavala@gmail.com",
        contraseña: "Ana1234"
    },
    {
        nombre: "Luis",
        apellido: "Martínez",
        correo: "luis.martinez@gmail.com",
        contraseña: "Luis2024"
    },
    {
        nombre: "María",
        apellido: "Hernández",
        correo: "maria.hernandez@gmail.com",
        contraseña: "Maria#89"
    },
    {
        nombre: "Carlos",
        apellido: "Ramírez",
        correo: "carlos.ramirez@gmail.com",
        contraseña: "CarRam56"
    },
    {
        nombre: "Sofía",
        apellido: "López",
        correo: "sofia.lopez@gmail.com",
        contraseña: "SofiaPwd1"
    },
    {
        nombre: "Jorge",
        apellido: "Gómez",
        correo: "jorge.gomez@gmail.com",
        contraseña: "JGomez22"
    },
    {
        nombre: "Valeria",
        apellido: "Torres",
        correo: "valeria.torres@gmail.com",
        contraseña: "Vale_789"
    },
    {
        nombre: "Diego",
        apellido: "Flores",
        correo: "diego.flores@gmail.com",
        contraseña: "DiegoF90"
    },
    {
        nombre: "Paola",
        apellido: "Cruz",
        correo: "paola.cruz@gmail.com",
        contraseña: "Paola321"
    },
    {
        nombre: "Miguel",
        apellido: "Sánchez",
        correo: "miguel.sanchez@gmail.com",
        contraseña: "MigSan!"
    }
];

boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();

    const nuevoNombre = document.querySelector("#input_txt_nombre");
    const nuevoApellido = document.querySelector("#input_txt_apellido");
    const nuevoCorreo = document.querySelector("#input_txt_correo");
    const nuevaContraseña = document.querySelector("#input_txt_contraseña");

    //crea un nuevo objeto usuario
    const usuario = new Usuario(nombre.value,
        apellido.value);
    console.log(usuario);
    //metodod de el objeto document que se 
    //encarga de crear elementos
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);

    guardarDatos(usuario);

    guardarDatos = () => {
        console.log("modificando funcion")
    };

    guardarDatos();

    Usuarios.push({
        nombre: nuevoNombre.value,
        apellido: nuevoApellido.value,
        correo: nuevoCorreo.value,
        contraseña: nuevaContraseña.value
    });

    console.log(Usuarios);        

})

function cambiarNumero(event) {
    const numeroElementos = event.target.value;
    const contenido = document.querySelector("#contenedor_correos");
    contenido.innerHTML = " "; //limpia la etiqueta y su contenido antes de agregar
    for (let i = 1; i <= numeroElementos; i++) {
        //se agrega contenido usando la insercion de html por medio del 
        //innerHTML, que agregara todo lo que esta dentro de htmlAgregar
        //este metodo reemplaza todo o que esta dentro de la etiqueta por 
        //lo nuevo que se quiere agregar

        const htmlAgregar = `<label for="correo-${i}">Ingrese el correo ${i}</label>
            <input type="email" name="correo-${i}" id="correo-${i}">
            <br>`;

        contenido.innerHTML += htmlAgregar;
    }
}

//definimos una clase con sus propiedades y metodos.
class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }

    MostrarDatos() {
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}

//creando un objeto y lo estamos asignando a una cosntante 
let usuario2 = {
    Nombre: "Amancio",
    Apellido: "Torres",
    Edad: 28,
    MostrarDatos: () => {
        console.log(`Nombre: ${usuario2.Nombre} \nApellido: ${usuario2.Apellido}\nEdad: ${usuario2.Edad}`)
    }
}

//nos permite guardar funciones dentro de una variable o constante
let guardarDatos = (usuario) => {
    //llamamos un metodo definidio en una clase
    usuario.MostrarDatos();
    usuario2.MostrarDatos();
    usuario2.Nombre = "nuevo nombre";
    usuario2.MostrarDatos();
}







document.addEventListener("DOMContentLoaded", () => {
    const contenedor_usuarios = document.querySelector("#contenedor_usuarios");

    for (let i = 0; i < Usuarios.lenght; i++) {
        const contenedor_usuario = document.createElement("div");
        contenedor_usuario.id = "contenedor_usuario";

        const nombre = document.createElement("label");
        nombre.textContent = "Nombre:";

        const contenidoNombre = document.createElement("span");
        contenidoNombre.textContent = Usuarios[i].nombre;

        const apellido = document.createElement("label");
        apellido.textContent = "Apellido:";

        const contenidoApellido = document.createElement("span");
        contenidoApellido.textContent = Usuarios[i].apellido;

        contenedor_usuario.onclick = () => {
            console.log(Usuarios[i].nombre);
        }


        contenedor_usuario.appendChild(nombre);
        contenedor_usuario.appendChild(contenidoNombre);
        contenedor_usuario.appendChild(apellido);
        contenedor_usuario.appendChild(contenidoApellido);

        contenedor_usuarios.appendChild(contenedor_usuario);
    }


})


function LeerDatos(){
    const datosFormulario = new FormData(formulario);

    //el objeto datos tiene todos los parametros que tiene el formulario
    const datos= Object.fromEntries(datosFormulario.entries())
    //si se quita el name no va a salir tiene que tener el input un name ya que con eso lo encuentra

    let usuarioNuevo= new Usuario(datos.nombre, datos.apellido, datos.correo, datos.contraseña);

    console.log(usuarioNuevo); //.nombre para acceder especificaamnete pero asi es mas facil ya que accede a todos

}
