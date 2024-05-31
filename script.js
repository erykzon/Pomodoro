const html = document.querySelector('html')
const botonCorto =  document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio ('./sonidos/luna-rise-part-one.mp3')
const botonIniciarPausar =document.querySelector('#start-pause')
const textoIniciarPausar =document.querySelector('#start-pause span')
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const tiempoEnPantalla =document.querySelector('#timer')

const musicaCero = new Audio('./sonidos/beep.mp3')
const musicaStart = new Audio('./sonidos/play.wav')
const musicaPausa = new Audio('./sonidos/pause.mp3')

let tiempoTranscurridoEnSegundos = 1500
let IDintervalo = null




musica.loop = true

inputEnfoqueMusica.addEventListener('change', () => {
  if(musica.paused){
    musica.play()
  } else{
    musica.pause()
  } 
})


botonCorto.addEventListener('click',()=>{
  tiempoTranscurridoEnSegundos = 300
  cambiarconteto('descanso-corto')
  botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', ()=>{
  tiempoTranscurridoEnSegundos = 1500
  cambiarconteto('enfoque')
  botonEnfoque.classList.add('active')
})


botonLargo.addEventListener('click', () => {
  tiempoTranscurridoEnSegundos = 900
  cambiarconteto('descanso-largo')
  botonLargo.classList.add('active')
});

function cambiarconteto(contexto) {
  mostrarTiempo()
  botones.forEach(function(contexto){
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src',`./imagenes/${contexto}.png`)
  
  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `
      Optimiza tu productividad,<br>
          <strong class="app__title-strong">sumérgete en lo que importa.</strong>
      `;
      break;
  case "descanso-corto":
      titulo.innerHTML = `
      ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
      `;
      break;
  case "descanso-largo":
      titulo.innerHTML = `
      Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
      `;
    default:
      break;
  }
  
}

const cuentaRegresiva  = ()=>{
  if (tiempoTranscurridoEnSegundos <= 0) {
    musicaCero.play()
    alert('tiempo se acabo')
    reinicar()
    return
    
  }
  textoIniciarPausar.textContent = "Pausar"
  botonIniciarPausar.setAttribute('src', '/imagenes/pause.png')
  tiempoTranscurridoEnSegundos -=1
  mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar() {
  if (IDintervalo) {
    musicaPausa.play()
    reinicar()
    return
  }
  musicaStart.play()
  IDintervalo = setInterval(cuentaRegresiva, 1000) 
}

function reinicar() {
  clearInterval(IDintervalo)
  IDintervalo = null
  textoIniciarPausar.textContent="Comenzar"
}

function mostrarTiempo() {
  const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000 ) 
  const tiempoFormatedo = tiempo.toLocaleTimeString('es-MX',{minute:"2-digit",second:"2-digit" })
  tiempoEnPantalla.innerHTML = `${tiempoFormatedo}`
}
mostrarTiempo()