//ya existe dentro de js con puntito. salen los metodos, 
// los dos almacenan dato de manera temporal, 
// el local se tiene que borrar la informacion de forma manual
localStorage.setItem("usuario", "ana") 

console.log(localStorage.getItem("usuario"))

//eliminar
localStorage.removeItem("usuario")