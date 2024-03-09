const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputMusic = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoPlay = document.querySelector('.app__card-primary-butto-icon');
const temporizador = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoInicio = new Audio('./sonidos/play.wav');
const sonidoPausa = new Audio('./sonidos/pause.mp3');
const sonidoAlerta = new Audio('/sonidos/beep.mp3');

let timerSeconds = 1500;
let idIntervalo = null;


musica.loop = true;

inputMusic.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});



botonCorto.addEventListener('click', () => {
    timerSeconds = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    timerSeconds = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    timerSeconds = 900;
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active');
});



function cambiarContexto(contexto){
    
    mostrarTiempo ();

    botones.forEach(function(contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = 
            `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            
            break;


        case "descanso-corto": 
            titulo.innerHTML = 
            `¿Qué tal tomar un respiro?
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`
              
            break;

        

        case "descanso-largo": 
            titulo.innerHTML = 
            `Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`
                  
    
        default:
            break;
    }

};




const cuentaRegresiva = () => {

    if(timerSeconds <= 0){
        sonidoAlerta.play();
        alert('Tiempo finalizado');
        reiniciar();
        return;
    }
        textoIniciarPausar.textContent = "Pausar";
        iconoPlay.setAttribute('src','./imagenes/pause.png');
        timerSeconds -=1;
        mostrarTiempo ();

};


botonIniciarPausar.addEventListener('click',  iniciarPausar);


function iniciarPausar () {
    if(idIntervalo){
        sonidoPausa.play();
        reiniciar();
        return;
    }

    sonidoInicio.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
};


function reiniciar () {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoPlay.setAttribute('src','./imagenes/play_arrow.png');
}


function mostrarTiempo () {
    const tiempo = new Date(timerSeconds * 1000);
    const formatoTiempo = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'});
    temporizador.innerHTML = `${formatoTiempo}`;
};


mostrarTiempo ();



















