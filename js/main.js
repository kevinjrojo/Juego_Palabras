import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let jumbledWord = document.querySelector(".jumbled-word");
let userResponse = document.querySelector(".user-response");
let previousWord = document.querySelector(".previous-word");
let resetGame = document.querySelector(".reset");
let random = document.querySelector(".random");
let life = document.querySelectorAll(".life");
let lifeNumber = document.querySelector(".life-number");
let losses = 0;
let numberInputs;
let response;

reiniciarTodo();
palabraRandom();
obtenerPalabras();
crearInputs();
obtenerRespuestas();

function gameover() {
  let errorPalabra = document.createElement("p");
  errorPalabra.innerText = "Palabra Incorrecta ❌,Vuelve a intentarlo!";
  errorPalabra.classList.add("msj");
  userResponse.appendChild(errorPalabra);
  setTimeout(() => {
    errorPalabra.innerText = null;
  }, 3000);
}
function winner() {
  Swal.fire({
    title: "🎉Haz Ganado ¡Felicidades!🎉",
    text: `El juego se reiniciara...`,
    background: "#1b1d29",
    width: 500,
    backdrop: "#c951e78a",
    color: "white",
    showConfirmButton: false,
    icon: "success",
  });
  setTimeout(() => {
    location.reload(true);
  }, 4000);
}
function youLost() {
  let perder = document.createElement("p");
  perder.innerText = "☠️Haz perdido☠️ El juego se reiniciara...";
  perder.classList.add("msj");
  userResponse.appendChild(perder);

  setTimeout(() => {
    location.reload(true);
  }, 4000);
}

function reiniciarTodo() {
  resetGame.addEventListener("click", () => {
    location.reload(true);
  });
}

function palabraRandom() {
  random.addEventListener("click", () => {
    losses = 0;
    previousWord.innerText = "Palabra anterior: ";
    lifeNumber.innerText = "Vidas(0/5):";
    for (let indice = 0; indice < life.length; indice++) {
      const element = life[indice];
      element.style.color = "#97a3b6";
    }
  });
}

function obtenerPalabras() {
  palabrasDesordenadas.forEach((element) => {
    let clave = Object.values(element);
    let indiceAleatorio = Math.floor(Math.random() * clave.length);

    let claveAleatorio = clave[indiceAleatorio];
    numberInputs = claveAleatorio;
  });
}

function crearInputs() {
  jumbledWord.innerText = numberInputs;
  for (let i = 0; i < numberInputs.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("letra");
    input.pattern = "[A-Za-z]";
    input.maxLength = 1;
    userResponse.appendChild(input);
  }
}

function obtenerRespuestas() {
  let numerosInputs = document.querySelectorAll('input[type="text"]');
  // de aca obtiene los input y index el forEach
  numerosInputs[0].focus();

  let evento = numerosInputs[numerosInputs.length - 1];

  numerosInputs.forEach((input, index) => {
    //  aca hay misma cantidad de input y index  console.log(input)
    input.addEventListener("keyup", function (event) {
      if (input.value.length === 0 && index > 0) {
        numerosInputs[index - 1].focus();
      }
      if (input.value.length === 1 && index < numerosInputs.length - 1) {
        numerosInputs[index + 1].focus();
      }
    });
  });

  evento.addEventListener("input", function () {
    let respuestaDeUsuario = [];
    let respuestaCorrecta = [];

    function palabraUsuario() {
      for (let i = 0; i < numerosInputs.length; i++) {
        const element = numerosInputs[i];
        response = element.value.toLowerCase();
        respuestaDeUsuario.push(response);
      }
    }
    function palabraCorrecta() {
      for (let i = 0; i < palabrasOrdenadas.length; i++) {
        const palabra = palabrasOrdenadas[i];
        respuestaCorrecta.push(palabra);
      }
    }

    palabraUsuario();
    palabraCorrecta();

    function compararPalabra() {
      let lugares = userResponse.querySelectorAll(".letra");
      let result = respuestaDeUsuario.join("");
      let palabrasInconrrectas = [];

      if (!respuestaCorrecta.includes(result)) {
        palabrasInconrrectas.push(result);
        let obtentenerError = palabrasInconrrectas[0];
        let separador = obtentenerError.split("");
        previousWord.innerText = `Palabra anterior: ${separador}`;
        lugares.forEach((input) => {
          input.value = "";
        });

        life.forEach((element, indice) => {
          if (indice === losses) {
            element.style.color = "#7429C6";
          }
        });
        losses++;
        lifeNumber.innerText = `Vidas(${losses}/5):`;
        lugares[0].focus();
        gameover();
      } else {
        winner();
      }
      if (losses === 5) {
        youLost();
      }
    }
    compararPalabra();
  });
}
