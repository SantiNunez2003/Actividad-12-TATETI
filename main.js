const jugadorX = "X";
const jugadorO = "O";
let turno = "X";

//Traemos todos los elementos con el la clase celda
const celdas = Array.from(document.querySelectorAll(".celda"));

//Traemos el h2 en el cual se expresa el resultado
const resultado = document.getElementById("ganador");

//Agregamos para cada uno de esos elementos un EventListener 
celdas.forEach((celda) => {
    celda.addEventListener("click" , () => {
        
        //Si el turno es finalizado se termina todo el juego 
        if(turno === "FINALIZADO") return;

        //Si la celda es indistinta a vacio, se puede jugar
        if(celda.innerHTML !== "") return;

        //Dependiendo del turno se agregara un valor u otro en la tabla
        if(turno === "X"){celda.innerHTML = jugadorX }else{celda.innerHTML = jugadorO };
        
        //Despues de cada movimineto(click) revisamos si hay algun ganado
        const posicionGanador = revisarGanador();

        //Manejamos lo que devuelve la funcion revisarGanador()
        if(typeof posicionGanador === "object"){

            //Agregamos al h2 el jugador que gano
            resultado.innerHTML = ("Juego finalizado, GANO: "+ turno +"!!");

            //Llamamos a la funcion ganador para que se asigne el estilo ganador 
            ganador(posicionGanador);
            
             //Llamos la funcion jugarOtraVez
            jugarOtraVez();
            return;
        }

        //Manejamos el empate
        if(posicionGanador === "EMPATE"){
    
            //Mostramos en el h2 que se empato
            resultado.innerHTML = ("Se empato, vamos a jugar otra vez.. ");
           
            //Llamos la funcion jugarOtraVez
            jugarOtraVez();
            return;
        }

        //Intercalamos los tunos
        if(turno === "X"){turno = "O"}else{turno = "X"};
    })
})

//Funcion para revisar si hay algun ganador
function revisarGanador(){
    //tranformamos los elementos de clase celda a un Array con los valores que tiene dentro
    const tablero = (celdas).map(cuadrado  => cuadrado.innerHTML);

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

//Funcion que colorea las celdas de la posicion ganadora
function ganador(posicionGanadora){
    turno = "FINALIZADO"

    posicionGanadora.forEach(pisicon => {
        celdas[pisicon].classList.add("ganador")
    })
};

//Funcion que vacia todas las celdas, saca el estilo, aigna el turno x y vacia el h2 pra volver a jugar
function jugarOtraVez(){
    //Ponemos un temoporizador de 2seg para volver a jugar
    setTimeout(() => {
        //Vaciamos el resultado
        resultado.innerHTML = "Juguemos otra vez!! Eres X",

        //Asignamos el turno
        turno = "X",

        //Vaciamos todas las celdas y sacamos el estilo ganador
        celdas.forEach(celda => {
            celda.innerHTML = "";
            celda.classList.remove("ganador");
        })
    }, 2000);
};