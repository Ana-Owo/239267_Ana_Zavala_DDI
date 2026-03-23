const tarjetas = document.querySelector("#contenedor_tarjetas");

//se obtienen los datos del localStorage
const datos = JSON.parse(localStorage.getItem("datosJson")) || [];
console.log("Datos cargados:", datos);

//validacion por si el admin borra el archivo
if (datos) {
    //el metodo forEach (lo investigue :D) permite recorrer el arreglo (en este caso de JSON) y hace una funcion (aparecer las tarjetas) por cada objeto
    datos.forEach(datos => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        //se muestran las tarjetas con los datos del Json
        tarjeta.innerHTML = `
        <img src="${datos.imagen}" class="imagenTarjetas">
        <h3>${datos.nombre}</h3>
        <h5>${datos.año}</h5>
        <p>${datos.descripccion}</p>
        `;
        tarjetas.appendChild(tarjeta);

    });

} else {
    //si esta vacio se limpia
    tarjetas.innerHTML = "";
}


//funcion para cerrar sesion, borra la sesion activa y el usuario 
// logeado, para despues mandar a la pagina de index (formulario incio de sesion)
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "../../index.html";
}

function IrEdicion(){
    window.location.href = "../editarPerfil/editarPerfil.html";
}

//para poner en la pagina la foto del perfil
const correo = localStorage.getItem("usuarioLogeado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const usuario = usuarios.find(u => u.correo === correo);

if (usuario && usuario.imagen) {
    document.querySelector("#fotoPerfil").src = usuario.imagen;
}

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