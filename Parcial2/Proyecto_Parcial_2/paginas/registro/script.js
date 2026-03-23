const formularioRegistro = document.querySelector("#form_1")
const botonVisitante = document.querySelector("#botonVisitante")
const botonAdministrador = document.querySelector("#botonAdministrador")

class Usuario {
    constructor(nom, correo, contra, contra2, tipoUsuario) {
        this.nombre = nom;
        this.correo = correo;
        this.contraseña = contra;
        this.contraseña2 = contra2;
        this.tipoUsuario = tipoUsuario;
    }
}

//variable vacia para guardar la foto de perfil
let fotoPerfil = "";

function LeerDatosRegistro(tipoUsuario) {
    const datosFormulario = new FormData(formularioRegistro);

    //el objeto datos tiene todos los parametros que tiene el formulario
    const datos = Object.fromEntries(datosFormulario.entries())
    //si se quita el name no va a salir tiene que tener el input un name ya que con eso lo encuentra

    let usuarioNuevo = new Usuario(datos.nombre, datos.correo, datos.contraseña, datos.contraseña2, tipoUsuario);

    usuarioNuevo.imagen = fotoPerfil;


    //seleccion de inputs en el index de inicio
    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");
    const contraseña2 = document.querySelector("#contraseña2");
    const nombre = document.querySelector("#nombre");
    


    //validacion de que los campos esten llenos
    if (datos.nombre == "" || datos.correo == "" || datos.contraseña == "" || datos.contraseña2 == "") {
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

    //validacion si no coincides las contraseñas sale una alerta
    if (datos.contraseña !== datos.contraseña2) {
        contraseña.style.border = "solid 2px red";
        contraseña2.style.border = "solid 2px red";
        alert("Las contraseñas no coinciden");
    }


    //validacion de todos los campos y las contraseñas
    if (
        datos.nombre !== "" &&
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
        alert("Usuario registrado como " + tipoUsuario);
        MostrarInicioSesion();
    }
    console.log(usuarioNuevo);//.nombre para acceder especificaamnete pero asi es mas facil ya que accede a todos
    
}

function MostrarInicioSesion() {
    window.location.href = "../../index.html";
}

//dependiendo del boto se guarda el tipo de usuario
botonVisitante.addEventListener("click", () => LeerDatosRegistro("visitante"));
botonAdministrador.addEventListener("click", () => LeerDatosRegistro("admin"));


document.querySelector("#input-imagen").addEventListener("change", (event) => {
    const url = leerArchivo(event.target.files[0])
    url.then((dato) => {
        const imagen = document.querySelector("#imagenSeleccionada");
        imagen.src = dato;

        //el dato se guarda en foto perfil
        fotoPerfil = dato;
    }).catch(
        (error)=>{
            console.log("Error:", error);
        }
    )
});

function leerArchivo(archivo) {
    return new Promise((resolve, reject) => {// se tiene que mandar tambien el archivo
        if (archivo) {

            //esto funciona si el archivo empiesa con image/ ta bien ya que asi es
            //  mas flexible con los tipo de imagenes 
            if (archivo.type.startsWith("image/")) {
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
