import { valida } from "./validaciones.js";

//Selecciona todos los inputs
const inputs = document.querySelectorAll("input");

//Una vez selecionados los inputs le agregar al addlisner y cuando sale de foco llama la funcion valida
inputs.forEach(input => {
    input.addEventListener('blur', (input)=> {
        valida(input.target);
    });
});