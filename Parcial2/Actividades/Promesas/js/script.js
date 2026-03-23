const promesa = new Promise((resolve, reject) =>{ //promise pide dos callback dos metodos o asi 
    //se crea la promesa
    let exito = true;//exito es para que se cumpla
    setTimeout(function(){
        if(exito){
            resolve("La tarea finalizó")
            return "la tarea se logró";
        }else{
            reject("La tarea falló")
        }
    }, 10000) //tiempo de espera, puede ser tambien sin un setTimeOut
}) 


async function funcionPrincipal () {
    

const resultado = await promesa.then((resultado)=>{ //se paso lo que hay dentro de exito a resultado, este seria un callback
    console.log(resultado);
}).catch((error)=>{
    console.log(error);
})

console.log("Se puede pasar a la siguiente tarea", resultado);
}

/*let peticionFetch = new Promise((resolve, reject)=>{
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetch(url).then(resultado => {
        if(resultado.ok)
            return resultado.json;
    }).then(datos =>{
        resolve(datos);
    }).catch(error =>{
        reject(error);
    })
});

peticionFetch.then(resultadoPeticion =>{
    console.log(resultadoPeticion);
}).catch(error =>{
    console.log(error);
})*/

//hacer una promesa para una pantalla de carga
/*const textoCarga = document.querySelector("#textoCarga")
const contenido = document.querySelector("#contenido")

contenido.style.display ="none"

const promesa = new Promise((resolve, reject) =>{ //promise pide dos callback dos metodos o asi 
    //se crea la promesa
    let exito = true;//exito es para que se cumpla
    setTimeout(function(){
        if(exito){
            resolve("La tarea finalizó")
        }else{
            reject("La tarea falló")
        }
    }, 3000) //tiempo de espera, la promesa puede ser tambien sin un setTimeOut
}) 

promesa.then((resultado)=>{ //se paso lo que hay dentro de exito a resultado, este seria un callback
    console.log(resultado);
    contenido.style.display ="block"
    textoCarga.style.display ="none"

}).catch((error)=>{
    console.log(error);
})*/

