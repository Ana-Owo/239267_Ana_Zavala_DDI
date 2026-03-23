const formularioInicio = document.querySelector("#form_1");

class UsuarioInicio {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

//es una funcion para leer los datos que se ingresan al iniciar sesion, se 
// valida si se llenó de informacion el input, sino da una alerta
function LeerDatosInicio() {
    const datosFormulario = new FormData(formularioInicio);

    //el objeto datos tiene todos los parametros que tiene el formulario
    const datos = Object.fromEntries(datosFormulario.entries())
    //si se quita el name no va a salir tiene que tener el input un name ya que con eso lo encuentra

    let usuarioNuevo = new UsuarioInicio(datos.correo, datos.contraseña);

    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");

    //validacion donde si no tiene nada, regresa una alerta
    if (datos.correo == "" || datos.contraseña == "") {
        alert("Este campo es obligatorio");
    }


    //para cambiar el color del borde si no esta lleno el input
    if (datos.correo === "") {
        correo.style.border = "solid 1px rgb(160, 49, 49)";
    } else {
        correo.style.border = "rgb(61, 61, 77)"
    }
    if (datos.contraseña === "") {
        contraseña.style.border = "solid 1px rgb(160, 49, 49)";
    } else {
        contraseña.style.border = "rgb(61, 61, 77)"
    }

    //se crea el usuario para guardar los datos del usuario,
    // pero tambien se tiene que pasar Json, 
    // si no hay nada el arreglo esta solito
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //encontrar a un usuario en el arreglo
    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo === datos.correo &&
        usuario.contraseña === datos.contraseña
    );


    //esta es la validacion donde si el usuario se encontro, entonces se crea 
    // la sesion activa y se guarda el correo del usuario que se logeo, para ahora 
    // si se mande a la pagina de inicio, sino muestra una alerta 
    if (usuarioEncontrado) {
        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("usuarioLogeado", usuarioEncontrado.correo);

        //dependiendo de si el tipo de usuario es admin o vitante se abre la pagina correspondiente
        if (usuarioEncontrado.tipoUsuario === "admin") {
            window.location.href = "paginas/administrador/administrador.html";
        } else {
            window.location.href = "paginas/visitante/visitante.html";
        }
    } else {
        alert("No se puede iniciar sesion");
    }
    console.log(usuarioNuevo); //.nombre para acceder especificaamnete pero asi es mas facil ya que accede a todos
}

//para abrir la pagina de inicio
function AbrirRegistro() {
    window.location.href = "paginas/registro/registro.html";
}

//cuando se termina de cargar el dom verifica si la sesion esta activa, 
// cuando eso pasa se abre la pagina, este seria el observador

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("sesionActiva") === "true") {

        //encontrar el usuario logueado
        const correoLogeado = localStorage.getItem("usuarioLogeado");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(u => u.correo === correoLogeado);

        if (usuarioEncontrado) {

            if (usuarioEncontrado.tipoUsuario === "admin") {
                window.location.href = "paginas/administrador/administrador.html";
            } else {
                window.location.href = "paginas/visitante/visitante.html";
            }

        }
    }
});

//mostrar el arreglo de usuarios en la consola
const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuariosGuardados);

 //localStorage.clear(); //ps para limpiar el arreglo de los usuairo qu eno jalaron
