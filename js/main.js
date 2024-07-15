import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

let palabras = document.querySelector(".palabra");
let inputs = document.querySelector(".respuestas");

for (let i = 0; i < palabrasDesordenadas.length; i++) {
  let palabrasdes = palabrasDesordenadas[i];
  let valor = Object.keys(palabrasdes);
  let indiceAleatorio = Math.floor(Math.random() * valor.length);
  let valorAleatorio = valor[indiceAleatorio];
  let palabraAleatorio = palabrasdes[valorAleatorio];
  palabras.innerText = palabraAleatorio;
  for (let i = 0; i < palabraAleatorio.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("letra");
    input.pattern = "[A-Za-z]";
    input.maxLength = 1;
    inputs.appendChild(input);
  }

  let inp = document.querySelectorAll('input[type="text"]');
  inp[0].focus();

  inp.forEach((input, index) => {
    //  aca hay misma cantidad de input y index
    input.addEventListener("keyup", function (event) {
      if (event.key.length === 1 && index < inp.length - 1) {
        // se cumple porque es -1
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
    const element = respuestaCorrecta[i].key;
    console.log(element);
  }
}, 10000);

/*for (let i = 0; i < palabrasOrdenadas.length; i++) {
  let palabras = palabrasOrdenadas[i];

  let aletorio = Math.random(palabras);
  let palabrasAletorias = palabras[aletorio];

  console.log(palabrasAletorias);
}*/

//console.log(palabras[i].ordenado + palabras[i].desordenado);
//console.log(palabras[0]);
