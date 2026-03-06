const tarjetas = document.querySelector("#contenedor_tarjetas");
const url = "https://catfact.ninja/facts?limit=5";


//peticion fetch
fetch(url).then(
    respuesta => {
        if (respuesta.ok)
            return respuesta.json();
    }
).then(
    //desenvolviendo datos obtenidos de la peticion
    datos => {

        console.log(datos);

        for (let i = 0; i < datos.data.length; i++) {
            

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";

            tarjeta.innerHTML = `
            <h3>Dato ${i+1}</h3>
            <p>${datos.data[i].fact}</p>
    
            `;
            tarjetas.appendChild(tarjeta);
        }
    }
).catch(error => {
    console.error(error.message);
})
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "../index.html";
}
