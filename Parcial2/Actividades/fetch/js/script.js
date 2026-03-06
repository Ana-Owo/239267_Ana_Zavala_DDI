const url = "https://pokeapi.co/api/v2/pokemon";
const contenedor = document.querySelector("#contenedor_tarjetas")
//no todas las apis funcionan igual

//peticion fetch
fetch(url).then(
    respuesta => {
        if (respuesta.ok)
            return respuesta.json();
    }
).then(
    //desenvolviendo datos obtenidos de la peticion
    datos => {
        //hacer otra peticion 
        for (let i = 0; i < datos.results.length; i++) {
            console.log(datos.results[1].url);

            fetch(datos.results[i].url).then(
                respuesta => {
                    if (respuesta.ok)
                        return respuesta.json();
                }
            ).then(
                datos_pokemon => {
                    console.log(datos_pokemon);
                    CrearTarjeta(datos_pokemon);
                }
            )
        }
    }
)
    .catch(error => {
        console.error(error.message);
    })

function CrearTarjeta(datos_pokemon) {
    const card = document.createElement("div");

    card.innerHTML = `
        <h3>${datos_pokemon.name}</h3>
        <img src="${datos_pokemon.sprites.front_default}" alt="${datos_pokemon.name}">
        <h4>${datos_pokemon.base_experience}</h4>
        <h4>${datos_pokemon.id}</h4>
        
    `;
    contenedor.appendChild(card);
}