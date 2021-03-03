// Lista de peliculas
const peliculas = [
  "SUPERMAN",
  "EL CABALLERO DE LA NOCHE",
  "DEADPOOL",
  "ESCUADRON SUICIDA",
  "LA LIGA DE LA JUSTICIA",
  "LOS VENGADORES",
  "LA GUERRA DE LOS MUNDOS",
];
// Obtiene la frase
const numeroPelicula = Math.floor(Math.random() * peliculas.length);
// Obtiene la pelicula
const pelicula = peliculas[numeroPelicula];
const letrasJugadas = [];
const maxFallas = 7;
let fallas = 0;

// Obtiene los elementos de la página
const areaFigura = document.getElementById("areaFigura");
const botonJugar = document.getElementById("botonJugar");
const botonAdivinar = document.getElementById("botonAdivinar");
const divLetrasJugadas = document.getElementById("letrasJugadas");
const textLetra = document.getElementById("textLetra");
const textAdivinar = document.getElementById("textAdivinar");
const divFrase = document.getElementById("frase");
const spanFallas = document.getElementById("fallas");
// Obtiene las partes del dibujo
const cabeza = document.getElementById("cabeza");
const tronco = document.getElementById("tronco");
const piernas = document.getElementById("piernas");
const brazos = document.getElementById("brazos");
const poste = document.getElementById("poste");
const viga = document.getElementById("viga");
const soga = document.getElementById("soga");

const hayGanador = () => {
  // Verifica si se llegó a la máxima cantidad de fallas
  if (fallas === maxFallas) {
    // Cambia el fondo del área de la figura
    areaFigura.style.background = "#ffafaf";
    // Deshabilita los botones
    botonJugar.disabled = true;
    botonAdivinar.disabled = true;
    return;
  }
  // Verifica si ya se adivinó la pelicula
  let ganador = true;
  // Recorre cada letra de la pelicula
  for (let i = 0; i < pelicula.length; i++) {
    // Obtiene la letra actual
    const letra = pelicula[i];
    // Verifica que la letra no sea un espacio
    if (letra !== " ") {
      // Verifica si las letras ya jugadas contienen la letra actual
      if (!letrasJugadas.includes(letra)) {
        // No hay ganador aún
        ganador = false;
      }
    }
  }
  // Muestra un mensaje si detectó ganador
  if (ganador) {
    // Deshabilita los botones
    botonJugar.disabled = true;
    botonAdivinar.disabled = true;
    // Muestra mensaje
    alert("Enhorabuena!");
  }
};

const incrementaFallas = () => {
  // Incrementa intentos
  fallas++;
  // Muestra los incrementos
  spanFallas.innerHTML = fallas;
  // Verifica qué parte del dibujo se debe mostrar
  switch (fallas) {
    case 1:
      cabeza.style.display = "inline";
      break;
    case 2:
      tronco.style.display = "inline";
      break;
    case 3:
      piernas.style.display = "inline";
      break;
    case 4:
      brazos.style.display = "inline";
      break;
    case 5:
      poste.style.display = "inline";
      break;
    case 6:
      viga.style.display = "inline";
      break;
    case 7:
      soga.style.display = "inline";
      break;
  }
};

const muestraJuego = () => {
  // Limpia el área de la frase
  divFrase.innerHTML = "";
  let i = 0;
  while (i < pelicula.length) {
    // Crea una casilla
    let casilla = document.createElement("div");
    casilla.classList.add("casilla");
    // Verifica si dentro de las letras jugadas está la letra de la pelicula
    if (letrasJugadas.includes(pelicula[i])) {
      // Muestra la letra
      casilla.textContent = pelicula[i];
    }
    // Agrega la casilla
    divFrase.appendChild(casilla);
    // Pasa a la siguiente letra
    i++;
  }
};

const muestraLetrasJugadas = (letra) => {
  // Crea el elemento a mostrar
  const spanLetra = document.createElement("span");
  spanLetra.textContent = letra;
  // Agrega el elemento al área de letras jugadas
  divLetrasJugadas.appendChild(spanLetra);
};

const jugar = () => {
  // Obtiene el texto digitado
  const letra = textLetra.value.toUpperCase();
  // Verifica si la letra ya se jugó
  const yaJugada = letrasJugadas.includes(letra);
  if (!yaJugada) {
    // Agrega la letra a las letras jugadas
    letrasJugadas.unshift(letra);
    // Muestra las letras jugadas
    muestraLetrasJugadas(letra);
    // Verifica si la letra está en la frase
    const estaEnFrase = pelicula.includes(letra);
    if (estaEnFrase) {
      // Muestra el nuevo juego
      muestraJuego();
    } else {
      // Incrementa los intentos
      incrementaFallas();
    }
    // Verifica en la jugada actual se ganó o perdió el juego
    hayGanador();
  }
  // Limpia el texto para jugar la letra
  textLetra.value = "";
  textLetra.focus();
};

// Genera los espacios de juego
const generarEspacios = () => {
  // Recorre la pelicula
  let i = 0;
  while (i < pelicula.length) {
    // Crea una casilla
    let casilla = document.createElement("div");
    casilla.classList.add("casilla");
    // casilla.textContent = pelicula[i];
    divFrase.appendChild(casilla);

    i++;
  }
  console.log(pelicula);
};

const ocultaPartes = () => {
  cabeza.style.display = "none";
  cabeza.style.display = "none";
  tronco.style.display = "none";
  piernas.style.display = "none";
  brazos.style.display = "none";
  poste.style.display = "none";
  viga.style.display = "none";
  soga.style.display = "none";
};

// Reacciona al click en el boton de adivinar
botonAdivinar.addEventListener("click", () => {
  // Verifica si el texto de adivinanza es igual a la pelicula
  if (pelicula === textAdivinar.value.toUpperCase()) {
    alert("Felicitaciones! Has salvado una vida");
  }
});

// Reacciona al click en el boton de juego
botonJugar.addEventListener("click", () => {
  jugar();
});

// Genera los espacios
generarEspacios();

// Oculta las partes del dibujo
ocultaPartes();
