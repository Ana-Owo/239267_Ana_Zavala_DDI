//para encontrar el usuario actual
const correoLogeado = localStorage.getItem("usuarioLogeado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const usuarioActual = usuarios.find(u => u.correo === correoLogeado);

//y ps sí si está, pone en los input los datos que ya estaban para que el usuario los cambie
if (usuarioActual) {
    document.querySelector("#NuevoNombre").value = usuarioActual.nombre;
    document.querySelector("#NuevoCorreo").value = usuarioActual.correo;
    document.querySelector("#NuevaContraseña").value = usuarioActual.contraseña;
    document.querySelector("#NuevaContraseña2").value = usuarioActual.contraseña2;
    if (usuarioActual.imagen) {
        document.querySelector("#imagenSeleccionada").src = usuarioActual.imagen;
    }
}

//para que se cambie la imagen de perfil
let nuevaFoto = "";

document.querySelector("#input-imagen").addEventListener("change", (event) => {
    const archivo = event.target.files[0];

    leerArchivo(archivo).then((dato) => {
        nuevaFoto = dato;
        document.querySelector("#imagenSeleccionada").src = dato;
    });
});

//funcion reutilizada para leer la nueva imagen seleccionada
function leerArchivo(archivo) {
    return new Promise((resolve, reject) => {
        if (archivo && archivo.type.startsWith("image/")) {
            const lector = new FileReader();

            lector.onload = (e) => resolve(e.target.result);
            lector.readAsDataURL(archivo);
        } else {
            reject();
        }
    });
}

//para guardar los cambios con el boton de guardar
document.querySelector("#guardarEdicion").addEventListener("click", () => {

    const nuevoNombre = document.querySelector("#NuevoNombre").value;
    const nuevoCorreo = document.querySelector("#NuevoCorreo").value;
    const nuevaContraseña = document.querySelector("#NuevaContraseña").value;
    const nuevaContraseña2 = document.querySelector("#NuevaContraseña2").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const correoLogeado = localStorage.getItem("usuarioLogeado");


    //investigue y el findeIndez ayuda para encontrar directamente en el arreglo
    // al usuario que coincide con el correo logeado
    const index = usuarios.findIndex(u => u.correo === correoLogeado);


    //validacion de que si cambia la contraseña, estas tienen que ser las mismas
    if (nuevaContraseña === nuevaContraseña2) {
        //la constante index ahora tiene el numero de la 
        // posicion entonces mientras que sea diferente a -1 (no existe)
        //va a guardar los nuevos datos directamente desde su posicion en el arreglo de usuarios
        if (index !== -1) {
            usuarios[index].nombre = nuevoNombre;
            usuarios[index].correo = nuevoCorreo;
            usuarios[index].contraseña = nuevaContraseña;
            usuarios[index].contraseña2 = nuevaContraseña2;

            if (nuevaFoto) {
                usuarios[index].imagen = nuevaFoto;
            }

            // actualizar sesión
            localStorage.setItem("usuarioLogeado", nuevoCorreo);

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Perfil actualizado");

            // regresar a la vista principal
            window.location.href = "../visitante/visitante.html";
        }
    } else{
        alert("Las nuevas contraseñas no coinciden")
    }


});