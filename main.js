const jugadorX = "X";
const jugadorO = "O";
let turno = "1";


//Traemos todos los elementos con el la clase celda
const celdas = document.querySelectorAll(".celda");

//Agregamos para cada uno de esos elementos un EventListener 
celdas.forEach((celda) => {
    celda.addEventListener("click" , () => {
        //Si el turno es finalizado se termina todo el juego 
        if(turno === "FINALIZADO") return;
        if(celda.innerHTML !== "") return;
        //Dependiendo del turno se agregara un valor u otro en la tabla
        if(turno === "1"){celda.innerHTML = jugadorX }else{celda.innerHTML = jugadorO };
        //Intercalamos los tunos
        if(turno === "1"){turno = "2"}else{turno = "1"};
        //Despues de cada movimineto(click) revisamos si hay algun ganado
        const posicionGanador = revisarGanador();

        if(typeof posicionGanador === "object"){
            ganador(posicionGanador);
            return;
        }
        if(posicionGanador === "EMPATE"){
            
        }
    })
})

//Funcion para revisar si hay algun ganador
function revisarGanador(){
    //tranformamos los elementos de clase celda a un Array con los valores que tiene dentro
    const tablero = Array.from(celdas).map(cuadrado  => cuadrado.innerHTML);
    console.log(tablero)

    //Revisamos si hay ganador en Horizontal
    //Con el for recorremos todas las filas aumentanto
    for (let i = 0; i <= 9 ; i+=3){
        //verificamor si la fila no esta bacia y si hay similitud entre la 1er celda, 2da ceda y la 3er celda
        if( tablero[i] &&
            tablero[i] === tablero[i+1] && 
            tablero[i] === tablero[i+2])
        {
            return [i,i+1,i+2];
        };
    };
      
    //Revisamos si hay ganador en Vertical
    for (let i = 0; i <= 3 ; i++) {
        //verificamor si la fila no esta bacia y si hay similitud entre la 1er celda, 2da ceda y la 3er celda
        if( tablero[i] &&
            tablero[i] === tablero[i + 3] && 
            tablero[i] === tablero[i + 6])
        {
            return [i,i+3,i+6];
        };
    };

    //Revisamos si hay ganador en Cruzadas
    if( tablero[0] &&
        tablero[0] === tablero[4] && 
        tablero[0] === tablero[8]){
            return [0,4,8];
        };
    
    if( tablero[2] &&
        tablero[2] === tablero[4] && 
        tablero[2] === tablero[6]){
            return [2,4,6];
        };
    
    //Revisamos si todavia hay lugares para jugar 
    if(tablero.includes("")) return;
    return "EMPATE"
    
};

function ganador(posicionGanadora){
    turno = "FINALIZADO"
    console.log("gano", posicionGanadora);
    posicionGanadora.forEach(pisicon => {
        celdas[pisicon].classList.add("ganador")
    })
};