
const jugadorX = "X"
const jugadorO = "O"
let turno = "1"

//Traemos todos los elementos con el la clase celda
const celdas = document.querySelectorAll(".celda")

//Agregamos para cada uno de esos elementos un EventListener 
celdas.forEach((celda) => {
    celda.addEventListener("click" , () => {
        //Dependiendo del turno se agregara un valor u otro en la tabla
        if(turno === "1"){celda.innerHTML = jugadorX }else{celda.innerHTML = jugadorO };
        //Intercalamos los tunos
        if(turno === "1"){turno = "2"}else{turno = "1"};
        //Despues de cada movimineto(click) revisamos si hay algun ganado
        revisarGanador();
    })
})

//Funcion para revisar si hay algun ganador
function revisarGanador(){
    //tranformamos los elementos de clase celda a un Array con los valores que tiene dentro
    const tablero = Array.from(celdas).map(celda  => celda.innerHTML );
    console.log(tablero)

    //Revisamos si hay ganador en Horizontal
    //Con el for recorremos todas las filas aumentanto
    for (let i = 0; i <= 9 ; i + 3) {
        //verificamor si la fila no esta bacia y si hay similitud entre la 1er celda, 2da ceda y la 3er celda
        if( tablero[i] != "" &&
            tablero[i] === tablero[i + 1] && 
            tablero[i] === tablero[i + 2])
        {
            console.log("gano")
        };
    }
      
        //Revisamos si hay ganador en Vertical

        //Revisamos si hay ganador en Cruzadas
    
}