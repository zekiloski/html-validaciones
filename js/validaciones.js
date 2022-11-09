//Valida el input ingresado , verifica que tipo de input es, atra vez de dataset.tipo
export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  //Validacion para verificar si se ingresa datos al input, si es false agrega la clase y si es true remueve clase input-container--invalid
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

//Funsion de tipos de Errores
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]

//Mensajes de Error al usuario en cada input OBJETOS
const mensajesDeError = {
    nombre: {
        valueMissing: "EL campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "EL campo email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
      valueMissing: "El campo password no puede estar vacio",
      patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "El campo fecha no puede estar vacio",
      customError: "Debes tener al menos 18 años de edad", 
    },
    numero: {
      valueMissing: "El campo numero de Telefono nu puede estar vacio",
      patternMismatch: "El formato requerido es xxxxxxxxxx 10 numeros",
    },
    direccion: {
      valueMissing: "El campo direccion no puede estar vacio",
      patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
      valueMissing: "El campo ciudad no puede estar vacio",
      patternMismatch: "La ciudad debe contener entre 3 y 30 caracteres",
    },
    provincias: {
      valueMissing: "El campo provincias no puede estar vacio",
      patternMismatch: "La provincias debe contener entre 3 y 30 caracteres",
    },
};



//Va armando el tipo de input
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

//Funsion Mensaje de error segun el tipo de input llama a la funsion tiopoerrores
function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  })
  return mensaje;
}

//Validacion para recibir el input y recibir valor
function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

//Validacion para verificar si es mayor de edad
function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
