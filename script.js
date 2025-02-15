const dadoInicial = document.getElementById('dado-inicial'); 
const mensajeLanzar = document.getElementById('mensaje-lanzar'); 
const Pag2 = document.getElementById('pag2'); 
const dadoResultado = document.getElementById('dado-resultado'); 
const frase = document.getElementById('frase'); 
const audio = document.getElementById('audio'); 

const frases = [
  "Me debes una hamburguesa <br>(y acompañarme a un concierto de Carolina Durante)", 
  "Me debes un paseo en Campo Grande alimentando bichitos <3", 
  "¡¡¡¡Baila!!!!", 
  "Simplemente cierra los ojos y disfruta... <br>(puedes regalarme una entrada para un concierto de Amaia)", 
  "Lo siento, acabo de provocarte vértigo <br>(puedes regalarme una entrada para un concierto de Paul Thin)", 
  "¡¡Vuelve a lanzarlo!!" 
];

const imagenesDado = [
  "imágenes/dado-1.png", 
  "imágenes/dado-2.png", 
  "imágenes/dado-3.png",
  "imágenes/dado-4.png",
  "imágenes/dado-5.png", 
  "imágenes/dado-6.png" 
];

const stickers = [
  "", 
  "", 
  "imágenes/ciempies.gif", 
  "", 
  "", 
  "" 
];

const clickSound = new Audio('audios/click.mp3');

const audios = [
  "audios/Carolina Durante - Hamburguesas (mp3cut.net).mp3", 
  "audios/princess.mp3", 
  "audios/flop flip flop - clers.mp3",
  "audios/Amaia - Despedida (mp3cut.net).mp3", 
  "audios/Paul Thin - Vértigo (mp3cut.net).mp3", 
  ""
];

const audioElements = audios.map(ruta => {
  if (ruta) {
    const audio = new Audio(ruta); 
    audio.preload = 'auto'; // Precarga el audio
    return audio;
  }
  return null; 
});

function reproducirAudio(ruta) {
  const audio = audioElements[audios.indexOf(ruta)]; 
  if (audio) {
    audio.currentTime = 0; // Reinicia el audio al principio
    audio.play(); 
  }
}

dadoInicial.addEventListener('click', () => {
  clickSound.play(); 
  dadoInicial.classList.add('lanzando');
  mensajeLanzar.classList.add('desvanecer'); 
  
  setTimeout(() => {
    dadoInicial.classList.add('oculto'); 
    resultado(); 
  }, 1000);
  
}); 

function resultado() {
  Pag2.classList.remove('oculto');
  const numero = Math.floor(Math.random() * 6) + 1; 
  frase.innerHTML = frases[numero - 1];
  dadoResultado.src = imagenesDado[numero - 1];
  dadoResultado.classList.add('cayendo');

  setTimeout(() => {
    frase.classList.add('aparecer');
    document.getElementById('sticker').style.backgroundImage = `url('${stickers[numero - 1]}')`;
    if (audios[numero - 1]) {
      reproducirAudio(audios[numero - 1]);
    }

    if (numero === 6) {
      VolverLanzar();
    }
  }, 1000);
}

function VolverLanzar(){
  dadoResultado.classList.add("dado-resultado-6");
  
  dadoResultado.addEventListener('click', () => {
    clickSound.play(); 
    frase.classList.remove('aparecer');
    Pag2.classList.add('oculto');
    dadoInicial.classList.remove('oculto');
    void dadoInicial.offsetWidth; // Reinicia la animación

    setTimeout(() => {
      dadoInicial.classList.add('oculto');
      resultado();
    }, 1000);
  });
}