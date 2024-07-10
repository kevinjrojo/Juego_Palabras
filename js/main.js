import { palabrasOrdenadas, palabrasDesordenadas } from "./palabras.js";

function ObtenerPalabras() {
  Math.random();

  for (let i = 0; i < palabrasDesordenadas.length - 1; i++) {
    let palabrasdes = palabrasDesordenadas[0].desordenado2;
    console.log(palabrasdes);
  }
  for (let i = 0; i < palabrasOrdenadas.length - 1; i++) {
    const palabrasord = palabrasOrdenadas[i];
    console.log(palabrasord);
  }
}

ObtenerPalabras();
//let aletorio = Math.floor(Math.random() * nombre.length);
//console.log(palabras[i].ordenado + palabras[i].desordenado);
//console.log(palabras[0]);
