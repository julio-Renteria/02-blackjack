(()=>{
    'use strict';

                // ?!*************Code*******************//

            let deck         = [];
            const   tipos      = ['C', 'D', 'H', 'S'],
                    especiales = ['A', 'J','Q', 'K'];

            
            let puntosJugadores = [];


            //? Refencias del html

            const btnNew = document.querySelector('#btnNew'),

                btnStop = document.querySelector('#btnStop'),

                btnPedir = document.querySelector('#btnPedir'),

                puntosHTML =  document.querySelectorAll('small');

            const divCartaJugadores = document.querySelectorAll('.divCartas');

                


                //?Esta funcion inicializa el juego 

                const InicializarJuego = ( numJugadores = 2 ) => {
            
                    deck = crearDeck();

                    puntosJugadores = [];
                    for (let i = 0; i < numJugadores; i++) {
                        puntosJugadores.push(0);
                    } 


                    puntosHTML.forEach(elem => elem.innerText = 0);

                    divCartaJugadores.forEach(elem => elem.innerHTML = '');

                    btnPedir.disabled = false;
                    btnStop.disabled = false;
                    
                    
                }

            //todo -- Esta funcion ↓ crear un nuevo deck (baraja)

            const crearDeck=()=>{
                // crear tipos
                deck = [];
                for(let i = 2; i <= 10; i++){
                        for(let tipo of tipos  ){
                            deck.push(i + tipo);
                        }
                    }

                    
            //! crear especiales
                for(let tipo of tipos){
                for(let esp of especiales ){
                    deck.push(esp + tipo);
                }
            }
                
                return _.shuffle(deck);
                        
            }

           


            //todo - Esta funcion me permite tomar una carta

            const pedirCarta = ()=>{

                if( deck.length === 0 ){
                    throw 'No hay cartas en en deck';
                }

                return  deck.pop(); // remueve el ultimo objeto del arreglo y lo retorna
            
            }


            const  valorCarta = (carta) => {

                const valor = carta.substring(0, carta.length - 1); // remuevo la ultima letra del string
                
                return ( isNaN (valor) ) ?
                        (valor === 'A')  ? 11 : 10

                        : valor *1; //si no es una letra valor por 1 (convertir el resultado en numero al multiplicarlo por 1)

            }

            //? funciona para puntos 
            // Turno: 0 = primer jugador y el ultimo sera la computadora

            const acumularPuntos = ( carta, turno ) => {
                puntosJugadores[turno] += valorCarta(carta);
                puntosHTML[turno].innerText = puntosJugadores[turno];
                return puntosJugadores[turno];
            }

            const crearCarta = ( carta, turno ) => {

                const imgCarta = document.createElement('img');

                    imgCarta.src = `assets/cartas/${carta}.png`;

                    imgCarta.classList.add('carta');

                    divCartaJugadores[turno].append( imgCarta );
            }

            // TODo determinara ganador

            const determinarGanador = () => {

                const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

                
                setTimeout(() => {

                    if(puntosComputadora === puntosMinimos){
                        alert('Nadie Gana');
    
                    }else if( puntosMinimos > 21){
                        alert(' Computadora Gana');
    
                    }else if (puntosComputadora > 21){
                        alert(' Jugardor  Gana');
    
                    }else{
                        alert('Computadora Gana');
                    } 
                    
                    }, 30);
            }



            //***** Turno de la Computadora ******//

            const turnoComputadora = (puntosMinimos) => {
                let puntosComputadora = 0;

                do {

                    const carta = pedirCarta();

                    puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
                    
              
                    //! crear carta 
                    crearCarta(carta, puntosJugadores.length -1)

                }while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

                //! mensaje del Ganador
                determinarGanador();          
                

        }


            //* Eventos ************
            btnPedir.addEventListener('click',function(){

                const carta = pedirCarta();
                const puntosJugador = acumularPuntos( carta, 0);

                 //! crear carta 
                crearCarta(carta, 0)
                


                //! logica para ganador  o perdedor

                if (puntosJugador > 21 ){
                    console.warn('Perdistes el juego');
                    btnPedir.disabled = true;
                    btnStop.disabled = true;
                    turnoComputadora(puntosJugador);

                }else if (puntosJugador === 21 ){
                    console.warn('Ganastes el  juego con 21');
                    btnPedir.disabled = true;
                    btnStop.disabled = true;
                    turnoComputadora(puntosJugador);
                }


            })


            //! Boton detener 

            btnStop.addEventListener('click',() => {
                btnStop.disabled = true;
                btnPedir.disabled = true;

                turnoComputadora(puntosJugadores[0]);    

            })


            //! Boton Nuevo juego

            btnNew.addEventListener('click',() => {

                InicializarJuego();
                
            });

    
})();



