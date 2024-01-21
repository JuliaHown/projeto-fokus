const html = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const startPauseBtn = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const imgDePauseBtn = document.querySelector('#start-pause img');
const musicaDeFocoInput = document.querySelector('#alternar-musica');
const temporizador = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somDePlay = new Audio('/sons/play.wav');
const somDePause = new Audio('/sons/pause.mp3');
const somTemporizadorZerado = new Audio('/sons/beep.mp3');


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;


musicaDeFocoInput.addEventListener('change', () => {

    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }

}) 

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBtn.classList.add('active')

})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')

})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')

})

function alterarContexto(contexto) {

    mostrarTemporizador()

    botoes.forEach( function(contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
        title.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
        break;
        default:
            break;
    } 

}

const contagemRegressiva = () => {

    if(tempoDecorridoEmSegundos <= 0) {
        somTemporizadorZerado.play()
        alert('Tempo finalizado')
        zerarIntervalo()
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTemporizador()

}

startPauseBtn.addEventListener('click', iniciarOuPausarIntervalo);

function iniciarOuPausarIntervalo() {
    if(intervaloId) {
        somDePause.play();
        zerarIntervalo()
        return
    }
    somDePlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    imgDePauseBtn.setAttribute('src', '/imagens/pause.png');

}

function zerarIntervalo() {
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar";
    imgDePauseBtn.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;

}

function mostrarTemporizador() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTemporizador()