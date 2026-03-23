//funcion para cerrar sesion, borra la sesion activa y el usuario 
// logeado, para despues mandar a la pagina de index (formulario incio de sesion)
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "../../index.html";
}

//para poner en la pagina la foto del perfil
const correo = localStorage.getItem("usuarioLogeado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuario = usuarios.find(u => u.correo === correo);

if (usuario && usuario.imagen) {
    document.querySelector("#fotoPerfil").src = usuario.imagen;
}

//donde se va a guardar el archivo
let archivoSeleccionado = null;
const botonSubirArch = document.querySelector("#subirArch");


//se selecciono el archivo wuuuuu
document.querySelector("#input-json").addEventListener("change", (event) => {
    archivoSeleccionado = event.target.files[0];
    alert("Archivo seleccionado correctamente");
});


//lo que boton hace para guardar el archivo en el localstorage
botonSubirArch.addEventListener("click", () => {

    //validacion para ver que un archivo si se subio
    if (!archivoSeleccionado) {
        alert("Primero selecciona un archivo");
        return;
    }

    // variable para el lector del archivo
    const lector = new FileReader();

    //cuando cargue guarda el archivo
    lector.onload = function (e) {
        try {
            //se guarda el contenido en la variable
            const contenido = JSON.parse(e.target.result)
            console.log("si se pudo", contenido)
            //se guarda el archivo en localStorage
            localStorage.setItem("datosJson", JSON.stringify(contenido))
            alert("El archivo se ha subido correctamente")
        } catch (error){
            alert("El archivo no es un JSON válido");
        }
    }

    //ahora si se lee el archivo
    lector.readAsText(archivoSeleccionado);
})

//validacion para no mostrar el link de Subir archivo ya que solo es vista de administrador
const correoLogeado = localStorage.getItem("usuarioLogeado");
const usuarioEncontrado = usuarios.find(u => u.correo === correoLogeado);
const linkAdmin = document.querySelector("#ventanaSubirArch");

if (usuarioEncontrado) {

    if (usuarioEncontrado.tipoUsuario === "admin") {
        linkAdmin.style.display = "block";
    }
}

//para que se muestre que que usuario esta dentro de la pagina
const tipoUsuario = document.querySelector("#tipoUsuario");
if (usuarioEncontrado.tipoUsuario === "admin") {
    tipoUsuario.textContent = "Administrador";
} else {
    tipoUsuario.textContent = "Visitante";
}


//botoncito para borrar el archivo waos
const btnBorrar = document.querySelector("#btnBorrar");

btnBorrar.addEventListener("click", () => {
    localStorage.removeItem("datosJson");
    alert("Archivo eliminado correctamente");
});