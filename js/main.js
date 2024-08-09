import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let palabras = document.querySelector(".palabra");
let inputs = document.querySelector(".respuestas");
let pistas = document.querySelector(".pistas");
let reiniciar = document.querySelector(".reset");
let vidas = document.querySelectorAll(".vidas");
let save = 0;
let cantidadinputs;

function oportunidades() {
  console.log(vidas);
}

oportunidades;

function reiniciarTodo() {
  reiniciar.addEventListener("click", () => {
    location.reload(true);
  });
}

reiniciarTodo();

function obtenerPalabras() {
  palabrasDesordenadas.forEach((element) => {
    let clave = Object.values(element);
    let indiceAleatorio = Math.floor(Math.random() * clave.length);

    let claveAleatorio = clave[indiceAleatorio];
    cantidadinputs = claveAleatorio;
  });
}

obtenerPalabras();

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

mostrarPalabra();

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
  evento.addEventListener("keyup", function () {
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
        alert(`La palabra ${result} es correcta`);
      }
    }
    compararPalabra();
  });
}

obtenerRespuestas();

/*

  inp.forEach((input, index) => {
    //  aca hay misma cantidad de input y index
    input.addEventListener("keyup", function (event) {
      if (event.key.length === 1 && index < inp.length - 1) {
        // se cumple porque es -1
        console.log(event);
        inp[index + 1].focus();
        respuestaCorrecta.push({
          key: event.key,
        });
      }
    });
  });
}

let respuestaCorrecta = [];

setTimeout(() => {
  for (let i = 0; i < respuestaCorrecta.length; i++) {
    const element = respuestaCorrecta[i];
    console.log(element);
  }
}, 10000);

/*for (let i = 0; i < palabrasOrdenadas.length; i++) {
  let palabras = palabrasOrdenadas[i];

  let aletorio = Math.random(palabras);
  let palabrasAletorias = palabras[aletorio];

  console.log(palabrasAletorias);
}
//console.log(palabras[0]);
let palabras = document.querySelector(".palabra");

*/

//console.log(palabras[i].ordenado + palabras[i].desordenado);
