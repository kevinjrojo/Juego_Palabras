import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let palabras = document.querySelector(".palabra");
let inputs = document.querySelector(".respuestas");
let pistas = document.querySelector(".pistas");
let reiniciar = document.querySelector(".reset");
let vidas = document.querySelectorAll(".vidas");
let posibilidades = document.querySelector(".cantidad");
let contador = 0;
let cantidadinputs;

reiniciarTodo();
obtenerPalabras();
mostrarPalabra();
obtenerRespuestas();

function reiniciarTodo() {
  reiniciar.addEventListener("click", () => {
    location.reload(true);
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

function mostrarPalabra() {
  palabras.innerText = cantidadinputs;
  function crearInputs() {
    for (let i = 0; i < cantidadinputs.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.classList.add("letra");
      input.pattern = "[A-Za-z]";
      input.maxLength = 1;
      inputs.appendChild(input);
    }
  }
  crearInputs();
}

function obtenerRespuestas() {
  let numerosInputs = document.querySelectorAll('input[type="text"]');
  // de aca obtiene los input y index el forEach
  numerosInputs[0].focus();
  let evento = numerosInputs[numerosInputs.length - 1];
  numerosInputs.forEach((input, index) => {
    //  aca hay misma cantidad de input y index  console.log(input)
    input.addEventListener("keyup", function (event) {
      if (event.key === "Backspace") {
        numerosInputs[index - 1].focus();
      }
      if (event.key.length === 1 && index < numerosInputs.length - 1) {
        numerosInputs[index + 1].focus();
      }
    });
  });
  evento.addEventListener("", function () {
    let respuestaDeUsuario = [];
    let respuestaCorrecta = [];

    function palabraUsuario() {
      for (let i = 0; i < numerosInputs.length; i++) {
        const element = numerosInputs[i];
        let respuesta = element.value;
        respuestaDeUsuario.push(respuesta);
      }
    }
    palabraUsuario();
    function palabraCorrecta() {
      for (let i = 0; i < palabrasOrdenadas.length; i++) {
        const palabra = palabrasOrdenadas[i];
        respuestaCorrecta.push(palabra);
      }
    }
    palabraCorrecta();

    function compararPalabra() {
      let lugares = inputs.querySelectorAll(".letra");
      let result = respuestaDeUsuario.join("");
      let palabrasInconrrectas = [];

      if (!respuestaCorrecta.includes(result)) {
        palabrasInconrrectas.push(result);
        let obtentenerError = palabrasInconrrectas[0];
        let separador = obtentenerError.split("");

        pistas.innerText = `Mistakes: ${separador}`;

        lugares.forEach((input) => {
          input.value = "";
        });

        vidas.forEach((element, indice) => {
          if (indice === contador) {
            element.style.color = "#7429C6";
          }
        });
        contador++;
        posibilidades.innerText = `Tries(${contador}/5):`;
        lugares[0].focus();
        Swal.fire({
          icon: "error",
          title: `La palabra es incorrecta`,
          text: "Vuelve a intentarlo!",
          background: "#1b1d29",
          color: "#F2F5F9",
          confirmButtonColor: "#c951e7",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "RESPUESTA CORRECTA! 🎉",
          text: "Felicidades haz ganado 🏆",
          background: "#1b1d29",
          color: "#F2F5F9",
          confirmButtonColor: "#c951e7",
        });
      }
      if (contador === 5) {
        Swal.fire({
          icon: "error",
          title: `GAME OVER`,
          text: "Vuelve a intentarlo!",
          background: "#1b1d29",
          color: "#F2F5F9",
          confirmButtonColor: "#c951e7",
        });
        setTimeout(() => {
          location.reload(true);
          as;
        }, 4000);
      }
    }
    compararPalabra();
  });
}

function evetosMovil() {
  let numerosInputs = document.querySelectorAll('input[type="text"]');
  // de aca obtiene los input y index el forEach
  numerosInputs[0].focus();
  let evento = numerosInputs[numerosInputs.length - 1];
  numerosInputs.forEach((input, index) => {
    //  aca hay misma cantidad de input y index  console.log(input)
    input.addEventListener("touchend", function (event) {
      if (event.key === "Delete") {
        numerosInputs[index - 1].focus();
      }
      if (event.key.length === 1 && index < numerosInputs.length - 1) {
        numerosInputs[index + 1].focus();
      }
    });
  });
}
