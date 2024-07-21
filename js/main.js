import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let palabras = document.querySelector(".palabra");
let inputs = document.querySelector(".respuestas");
let cantidadinputs;

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

let respuestaDeUsuario = [];

function obtenerRespuestas() {
  let numerosInputs = document.querySelectorAll('input[type="text"]');
  // de aca obtiene los input y index el forEach
  numerosInputs[0].focus();
  let evento = numerosInputs[numerosInputs.length - 1];
  numerosInputs.forEach((input, index) => {
    //  aca hay misma cantidad de input y index  console.log(input)

    input.addEventListener("keyup", function (event) {
      if (event.key.length === 1 && index < numerosInputs.length - 1) {
        numerosInputs[index + 1].focus();
      }
    });
  });
  evento.addEventListener("keyup", function (event) {
    for (let i = 0; i < numerosInputs.length; i++) {
      const element = numerosInputs[i];
      let respuesta = element.value;
      respuestaDeUsuario.push(respuesta);
    }
  });
}

obtenerRespuestas();

setTimeout(() => {
  console.log(respuestaDeUsuario);
}, 10000);

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
