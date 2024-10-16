import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let palabras = document.querySelector(".palabra");
let inputs = document.querySelector(".respuestas");
let pistas = document.querySelector(".pistas");
let reiniciar = document.querySelector(".reset");
let random = document.querySelector(".random");
let vidas = document.querySelectorAll(".vidas");
let posibilidades = document.querySelector(".cantidad");
let contador = 0;
let cantidadinputs;
let respuesta;

reiniciarTodo();
palabraRandom();
obtenerPalabras();
crearInputs();
obtenerRespuestas();

function gameover() {
  let errorPalabra = document.createElement("p");
  errorPalabra.innerText = "Palabra Incorrecta ❌,Vuelve a intentarlo!";
  errorPalabra.classList.add("msj");
  inputs.appendChild(errorPalabra);
  setTimeout(() => {
    errorPalabra.innerText = null;
  }, 3000);
}
function winner() {
  Swal.fire({
    title: "🎉Haz Ganado ¡Felicidades!🎉",
    text: `El juego se reiniciara en 4seg...`,
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
  inputs.appendChild(perder);

  setTimeout(() => {
    location.reload(true);
  }, 4000);
}

function reiniciarTodo() {
  reiniciar.addEventListener("click", () => {
    location.reload(true);
  });
}

function palabraRandom() {
  random.addEventListener("click", () => {
    contador = 0;
    posibilidades.innerText = "Vidas(0/5)";
    for (let indice = 0; indice < vidas.length; indice++) {
      const element = vidas[indice];
      element.style.color = "#97a3b6";
    }
  });
}

function obtenerPalabras() {
  palabrasDesordenadas.forEach((element) => {
    let clave = Object.values(element);
    let indiceAleatorio = Math.floor(Math.random() * clave.length);

    let claveAleatorio = clave[indiceAleatorio];
    cantidadinputs = claveAleatorio;
  });
}

function crearInputs() {
  palabras.innerText = cantidadinputs;
  for (let i = 0; i < cantidadinputs.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("letra");
    input.pattern = "[A-Za-z]";
    input.maxLength = 1;
    inputs.appendChild(input);
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
        respuesta = element.value.toLowerCase();
        respuestaDeUsuario.push(respuesta);
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
      let lugares = inputs.querySelectorAll(".letra");
      let result = respuestaDeUsuario.join("");
      let palabrasInconrrectas = [];

      if (!respuestaCorrecta.includes(result)) {
        palabrasInconrrectas.push(result);
        let obtentenerError = palabrasInconrrectas[0];
        let separador = obtentenerError.split("");
        pistas.innerText = `Palabra anterior: ${separador}`;
        lugares.forEach((input) => {
          input.value = "";
        });

        vidas.forEach((element, indice) => {
          if (indice === contador) {
            element.style.color = "#7429C6";
          }
        });
        contador++;
        posibilidades.innerText = `Vidas(${contador}/5):`;
        lugares[0].focus();
        gameover();
      } else {
        winner();
      }
      if (contador === 5) {
        youLost();
      }
    }
    compararPalabra();
  });
}
