const formularioInicio = document.querySelector("#form_1");

class UsuarioInicio {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

class UsuarioRegistro {
    constructor(nom, ape, correo, contra, contra2) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
        this.contraseña2 = contra2;
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
        correo.style.border = "solid 2px rgb(160, 49, 49)";
    } else {
        correo.style.border = "rgb(61, 61, 77)"
    }
    if (datos.contraseña === "") {
        contraseña.style.border = "solid 2px rgb(160, 49, 49)";
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
        window.location.href = "pagina/SesionIniciada.html";
    } else {
        alert("No se puede iniciar sesion");
    }
    console.log(usuarioNuevo); //.nombre para acceder especificaamnete pero asi es mas facil ya que accede a todos
    


}

//se crean todos los elementos de registro
function AbrirRegistro() {

    formularioInicio.innerHTML = ""; //este es para borrar lo que tiene adentro el formulario 
    //para ahora si poder crear el tro formulario de registro

    const titulo = document.createElement("h1");
    titulo.textContent = "Registrate";

    const nombre = document.createElement("label");
    nombre.textContent = "Nombre:";
    const inputNombre = document.createElement("input");
    inputNombre.name = "nombre";
    inputNombre.id = "nombre"
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre";
    inputNombre.required = true;

    const apellido = document.createElement("label");
    apellido.textContent = "Apellido:";
    const inputApellido = document.createElement("input");
    inputApellido.name = "apellido";
    inputApellido.id = "apellido"
    inputApellido.type = "text";
    inputApellido.placeholder = "Apellido";
    inputApellido.required = true;

    const correo = document.createElement("label");
    correo.textContent = "Correo:";
    const inputCorreo = document.createElement("input");
    inputCorreo.name = "correo";
    inputCorreo.id = "correo"
    inputCorreo.type = "text";
    inputCorreo.placeholder = "Correo";
    inputCorreo.required = true;

    const contraseña = document.createElement("label");
    contraseña.textContent = "Contraseña:";
    const inputContraseña = document.createElement("input");
    inputContraseña.name = "contraseña";
    inputContraseña.id = "contraseña";
    inputContraseña.type = "password";
    inputContraseña.placeholder = "Contraseña";
    inputContraseña.required = true;

    const contraseña2 = document.createElement("label");
    contraseña2.textContent = "Confirmar contraseña:";
    const inputContraseña2 = document.createElement("input");
    inputContraseña2.name = "contraseña2";
    inputContraseña2.id = "contraseña2";
    inputContraseña2.type = "password";
    inputContraseña2.placeholder = "Contraseña";
    inputContraseña2.required = true;

    const botonGuardar = document.createElement("button");
    botonGuardar.type = "button";
    botonGuardar.textContent = "Guardar";
    botonGuardar.addEventListener("click", LeerDatosRegistro);

    formularioInicio.appendChild(titulo);
    formularioInicio.appendChild(nombre);
    formularioInicio.appendChild(inputNombre);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(apellido);
    formularioInicio.appendChild(inputApellido);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(correo);
    formularioInicio.appendChild(inputCorreo);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(contraseña);
    formularioInicio.appendChild(inputContraseña);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(contraseña2);
    formularioInicio.appendChild(inputContraseña2);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(botonGuardar);

}

function LeerDatosRegistro() {
    const datosFormulario = new FormData(formularioInicio);

    //el objeto datos tiene todos los parametros que tiene el formulario
    const datos = Object.fromEntries(datosFormulario.entries())
    //si se quita el name no va a salir tiene que tener el input un name ya que con eso lo encuentra

    let usuarioNuevo = new UsuarioRegistro(datos.nombre, datos.apellido, datos.correo, datos.contraseña, datos.contraseña2);

    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");
    const contraseña2 = document.querySelector("#contraseña2");
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");


    //validacion de que los campos esten llenos
    if (datos.nombre == "" || datos.apellido == "" || datos.correo == "" || datos.contraseña == "" || datos.contraseña2 == "") {
        alert("Este campo es obligatorio");
    }


    //aqui es una validacion por separada para que se cambie el 
    //borde de los input que no tienen informacion y se vea mas bonito jeje
    if (datos.correo === "") {
        correo.style.border = "solid 2px rgb(160, 49, 49)";
        console.log("El correo es obligatorio");
    } else {
        correo.style.border = "rgb(61, 61, 77)"
    }
    if (datos.contraseña === "") {
        contraseña.style.border = "solid 2px rgb(160, 49, 49)";
        console.log("La contraseña es obligatorio");
    } else {
        contraseña.style.border = "rgb(61, 61, 77)"
    }
    if (datos.contraseña2 === "") {
        contraseña2.style.border = "solid 2px rgb(160, 49, 49)";
        console.log("La contraseña es obligatorio");
    } else {
        contraseña2.style.border = "rgb(61, 61, 77)"
    }
    if (datos.nombre === "") {
        nombre.style.border = "solid 2px rgb(160, 49, 49)";
        console.log("El nombre es obligatorio");
    } else {
        nombre.style.border = "rgb(61, 61, 77)"
    }
    if (datos.apellido === "") {
        apellido.style.border = "solid 2px rgb(160, 49, 49)";
        console.log("El apellido es obligatorio");
    } else {
        apellido.style.border = "rgb(61, 61, 77)"
    }

    //validacion si no coincides las contraseñas sale una alerta
    if (datos.contraseña !== datos.contraseña2) {
        contraseña.style.border = "solid 2px red";
        contraseña2.style.border = "solid 2px red";
        alert("Las contraseñas no coinciden");
    }


    //validacion de todos los campos y las contraseñas
    if (
        datos.nombre !== "" &&
        datos.apellido !== "" &&
        datos.correo !== "" &&
        datos.contraseña !== "" &&
        datos.contraseña2 !== "" &&
        datos.contraseña === datos.contraseña2
    ) {
        //para obtener al usuario guardado, pero tambien se tiene que pasar Json, 
        // si no hay nada el arreglo esta solito
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        //para agregar el usuario
        usuarios.push(usuarioNuevo);

        //se vuelve a guardar los datos 
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Usuario registrado");
        MostrarInicioSesion();
    }
    console.log(usuarioNuevo);//.nombre para acceder especificaamnete pero asi es mas facil ya que accede a todos
    
}


//para que al guardar el usuario desde registro se cree de nuevo el inicio de sesion
function MostrarInicioSesion() {

    formularioInicio.innerHTML = "";

    const titulo = document.createElement("h1");
    titulo.textContent = "Iniciar Sesión";

    const labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo:";
    const inputCorreo = document.createElement("input");
    inputCorreo.name = "correo";
    inputCorreo.id = "correo";
    inputCorreo.placeholder = "Escribe tu correo";
    inputCorreo.type = "text";

    const labelContra = document.createElement("label");
    labelContra.textContent = "Contraseña:";
    const inputContra = document.createElement("input");
    inputContra.name = "contraseña";
    inputContra.id = "contraseña";
    inputContra.placeholder = "Escribe tu contraseña";
    inputContra.type = "password";

    const botonLogin = document.createElement("button");
    botonLogin.textContent = "Entrar";
    botonLogin.type = "button";
    botonLogin.addEventListener("click", LeerDatosInicio);

    const botonRegistro = document.createElement("button");
    botonRegistro.textContent = "Registrarse";
    botonRegistro.type = "button";
    botonRegistro.addEventListener("click", AbrirRegistro);

    formularioInicio.appendChild(titulo);
    formularioInicio.appendChild(labelCorreo);
    formularioInicio.appendChild(inputCorreo);
    formularioInicio.appendChild(document.createElement("br"))
    formularioInicio.appendChild(labelContra);
    formularioInicio.appendChild(inputContra);
    formularioInicio.appendChild(document.createElement("br"))
    formularioInicio.appendChild(botonLogin);
    formularioInicio.appendChild(botonRegistro);
}

//cuando se termina de cargar el dom verifica si la sesion esta activa, 
// cuando eso pasa se abre la pagina, este seria el observador
window.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("sesionActiva") === "true") {
        window.location.href = "pagina/SesionIniciada.html";
    }

});


//funcion para cerrar sesion, borra la sesion activa y el usuario 
// logeado, para despues mandar a la pagina de index (formulario incio de sesion)

//mostrar el arreglo de usuarios en la consola
const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuariosGuardados);




